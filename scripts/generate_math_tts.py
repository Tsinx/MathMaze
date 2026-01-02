import os
import time
import requests
import dashscope

dashscope.base_http_api_url = 'https://dashscope.aliyuncs.com/api/v1'

OUTPUT_DIR = 'public/audio/math'
QUESTION_DIR = os.path.join(OUTPUT_DIR, 'question')
ANSWER_DIR = os.path.join(OUTPUT_DIR, 'answer')
API_KEY = os.getenv('DASHSCOPE_API_KEY')

if not API_KEY:
    print('错误: 请设置环境变量 DASHSCOPE_API_KEY')
    exit(1)

os.makedirs(QUESTION_DIR, exist_ok=True)
os.makedirs(ANSWER_DIR, exist_ok=True)

NUMBERS = {
    1: '一', 2: '二', 3: '三', 4: '四', 5: '五',
    6: '六', 7: '七', 8: '八', 9: '九', 10: '十',
    11: '十一', 12: '十二', 13: '十三', 14: '十四', 15: '十五',
    16: '十六', 17: '十七', 18: '十八', 19: '十九', 20: '二十'
}

def generate_tts(text: str, output_path: str, voice: str = 'Cherry', max_retries: int = 5) -> bool:
    if os.path.exists(output_path):
        print(f'✓ 跳过已存在: {os.path.basename(output_path)}')
        return True
    
    for attempt in range(max_retries):
        if attempt > 0:
            print(f'  重试 {attempt + 1}/{max_retries}...')
        
        try:
            rsp = dashscope.MultiModalConversation.call(
                model='qwen3-tts-flash-2025-11-27',
                api_key=API_KEY,
                text=text,
                voice=voice,
                language_type='Chinese',
                stream=False
            )
            
            if rsp.status_code == 200:
                audio_url = rsp.output.audio.url
                audio_data = requests.get(audio_url).content
                with open(output_path, 'wb') as f:
                    f.write(audio_data)
                print(f'✓ 完成: {os.path.basename(output_path)} - "{text}"')
                return True
            else:
                if 'rate limit' in rsp.message.lower() and attempt < max_retries - 1:
                    wait_time = 2 ** (attempt + 1)
                    print(f'  频率限制，等待 {wait_time} 秒后重试...')
                    time.sleep(wait_time)
                    continue
                print(f'✗ 失败: {os.path.basename(output_path)} - {rsp.message}')
                return False
                
        except Exception as e:
            print(f'✗ 错误: {os.path.basename(output_path)} - {str(e)}')
            if attempt < max_retries - 1:
                wait_time = 2 ** (attempt + 1)
                time.sleep(wait_time)
                continue
            return False
    
    return False

def main():
    print(f'开始生成加法式子 TTS 音频...\n')
    
    success_count = 0
    fail_count = 0
    total_count = 200
    
    for a in range(1, 11):
        for b in range(1, 11):
            c = a + b
            
            question_text = f'{NUMBERS[a]}加{NUMBERS[b]}等于几'
            question_file = os.path.join(QUESTION_DIR, f'question_{a}_{b}.wav')
            
            answer_text = f'{NUMBERS[a]}加{NUMBERS[b]}等于{NUMBERS[c]}'
            answer_file = os.path.join(ANSWER_DIR, f'answer_{a}_{b}_{c}.wav')
            
            if generate_tts(question_text, question_file):
                success_count += 1
            else:
                fail_count += 1
            
            time.sleep(0.05)
            
            if generate_tts(answer_text, answer_file):
                success_count += 1
            else:
                fail_count += 1
            
            time.sleep(0.05)
    
    print(f'\n完成! 成功: {success_count}, 失败: {fail_count}')
    print(f'出题音频保存在: {QUESTION_DIR}')
    print(f'答案音频保存在: {ANSWER_DIR}')

if __name__ == '__main__':
    main()
