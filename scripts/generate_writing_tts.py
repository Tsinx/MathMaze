import os
import time
import requests
import dashscope

dashscope.base_http_api_url = 'https://dashscope.aliyuncs.com/api/v1'

OUTPUT_DIR = 'public/audio/writing'
API_KEY = os.getenv('DASHSCOPE_API_KEY')

if not API_KEY:
    print('错误: 请设置环境变量 DASHSCOPE_API_KEY')
    exit(1)

os.makedirs(OUTPUT_DIR, exist_ok=True)

UPPERCASE_LETTERS = [
    '请核对表面蛋白，写出大写字母A',
    '请核对表面蛋白，写出大写字母B',
    '请核对表面蛋白，写出大写字母C',
    '请核对表面蛋白，写出大写字母D',
    '请核对表面蛋白，写出大写字母E',
    '请核对表面蛋白，写出大写字母F',
    '请核对表面蛋白，写出大写字母G',
    '请核对表面蛋白，写出大写字母H',
    '请核对表面蛋白，写出大写字母I',
    '请核对表面蛋白，写出大写字母J',
    '请核对表面蛋白，写出大写字母K',
    '请核对表面蛋白，写出大写字母L',
    '请核对表面蛋白，写出大写字母M',
    '请核对表面蛋白，写出大写字母N',
    '请核对表面蛋白，写出大写字母O',
    '请核对表面蛋白，写出大写字母P',
    '请核对表面蛋白，写出大写字母Q',
    '请核对表面蛋白，写出大写字母R',
    '请核对表面蛋白，写出大写字母S',
    '请核对表面蛋白，写出大写字母T',
    '请核对表面蛋白，写出大写字母U',
    '请核对表面蛋白，写出大写字母V',
    '请核对表面蛋白，写出大写字母W',
    '请核对表面蛋白，写出大写字母X',
    '请核对表面蛋白，写出大写字母Y',
    '请核对表面蛋白，写出大写字母Z',
]

LOWERCASE_LETTERS = [
    '请核对表面蛋白，写出小写字母a',
    '请核对表面蛋白，写出小写字母b',
    '请核对表面蛋白，写出小写字母c',
    '请核对表面蛋白，写出小写字母d',
    '请核对表面蛋白，写出小写字母e',
    '请核对表面蛋白，写出小写字母f',
    '请核对表面蛋白，写出小写字母g',
    '请核对表面蛋白，写出小写字母h',
    '请核对表面蛋白，写出小写字母i',
    '请核对表面蛋白，写出小写字母j',
    '请核对表面蛋白，写出小写字母k',
    '请核对表面蛋白，写出小写字母l',
    '请核对表面蛋白，写出小写字母m',
    '请核对表面蛋白，写出小写字母n',
    '请核对表面蛋白，写出小写字母o',
    '请核对表面蛋白，写出小写字母p',
    '请核对表面蛋白，写出小写字母q',
    '请核对表面蛋白，写出小写字母r',
    '请核对表面蛋白，写出小写字母s',
    '请核对表面蛋白，写出小写字母t',
    '请核对表面蛋白，写出小写字母u',
    '请核对表面蛋白，写出小写字母v',
    '请核对表面蛋白，写出小写字母w',
    '请核对表面蛋白，写出小写字母x',
    '请核对表面蛋白，写出小写字母y',
    '请核对表面蛋白，写出小写字母z',
]

NUMBERS = [
    '请核对表面蛋白，写出数字0',
    '请核对表面蛋白，写出数字1',
    '请核对表面蛋白，写出数字2',
    '请核对表面蛋白，写出数字3',
    '请核对表面蛋白，写出数字4',
    '请核对表面蛋白，写出数字5',
    '请核对表面蛋白，写出数字6',
    '请核对表面蛋白，写出数字7',
    '请核对表面蛋白，写出数字8',
    '请核对表面蛋白，写出数字9',
]

FEEDBACK_AUDIO = {
    'challenge_start': '要获得新队友，需要通过蛋白质识别挑战！准备好画板！',
    'three_stars': '太棒了！写得完美！你成功识别了蛋白质！',
    'two_stars': '很好！写得不错，你识别了蛋白质！',
    'one_star': '继续加油！你已经识别了蛋白质！',
    'failed': '没关系，再试一次！仔细看模板，你能做到的！',
    'ally_collected': '恭喜你！成功收集到新队友！',
}

VOICE = 'Cherry'

def generate_tts(text: str, output_path: str, max_retries: int = 5) -> bool:
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
                voice=VOICE,
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
    print(f'开始生成写字挑战 TTS 音频...\n')
    print(f'音色: {VOICE}\n')
    
    success_count = 0
    fail_count = 0
    
    print('=== 大写字母 (26个) ===')
    for i, text in enumerate(UPPERCASE_LETTERS):
        letter = chr(65 + i)
        filename = f'uppercase_{letter}.wav'
        output_path = os.path.join(OUTPUT_DIR, filename)
        
        if generate_tts(text, output_path):
            success_count += 1
        else:
            fail_count += 1
        
        time.sleep(0.05)
    
    print('\n=== 小写字母 (26个) ===')
    for i, text in enumerate(LOWERCASE_LETTERS):
        letter = chr(97 + i)
        filename = f'lowercase_{letter}.wav'
        output_path = os.path.join(OUTPUT_DIR, filename)
        
        if generate_tts(text, output_path):
            success_count += 1
        else:
            fail_count += 1
        
        time.sleep(0.05)
    
    print('\n=== 数字 (10个) ===')
    for i, text in enumerate(NUMBERS):
        filename = f'number_{i}.wav'
        output_path = os.path.join(OUTPUT_DIR, filename)
        
        if generate_tts(text, output_path):
            success_count += 1
        else:
            fail_count += 1
        
        time.sleep(0.05)
    
    print('\n=== 反馈音频 (6个) ===')
    for key, text in FEEDBACK_AUDIO.items():
        filename = f'{key}.wav'
        output_path = os.path.join(OUTPUT_DIR, filename)
        
        if generate_tts(text, output_path):
            success_count += 1
        else:
            fail_count += 1
        
        time.sleep(0.05)
    
    print(f'\n完成! 成功: {success_count}, 失败: {fail_count}')
    print(f'音频文件保存在: {OUTPUT_DIR}')
    print(f'总计: 26大写 + 26小写 + 10数字 + 6反馈 = 68个音频文件')

if __name__ == '__main__':
    main()
