import os
import time
import requests
import dashscope

dashscope.base_http_api_url = 'https://dashscope.aliyuncs.com/api/v1'

COMBAT_DIR = 'public/audio/combat'
API_KEY = os.getenv('DASHSCOPE_API_KEY')

if not API_KEY:
    print('错误: 请设置环境变量 DASHSCOPE_API_KEY')
    exit(1)

os.makedirs(COMBAT_DIR, exist_ok=True)

def generate_tts(text: str, output_path: str, voice: str = 'Serena', max_retries: int = 5) -> bool:
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
    print('修复"命中"音频 - 添加"攻击"上下文以正确读音\n')
    
    output_path = os.path.join(COMBAT_DIR, 'hit_enemy.wav')
    text = '攻击命中！敌人受到了伤害！'
    
    if generate_tts(text, output_path):
        print(f'\n修复成功！文件已保存: {output_path}')
    else:
        print(f'\n修复失败')

if __name__ == '__main__':
    main()
