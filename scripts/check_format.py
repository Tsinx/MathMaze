import os
import dashscope
import requests

API_KEY = os.getenv("DASHSCOPE_API_KEY")
if not API_KEY:
    exit(1)

text = "测试音频格式"
output_file = "test_format.mp3"

print("Generating...")
rsp = dashscope.MultiModalConversation.call(
    model='qwen3-tts-flash-2025-11-27',
    api_key=API_KEY,
    text=text,
    voice="Cherry",
    format='mp3',  # 尝试添加 format 参数
    stream=False
)

if rsp.status_code == 200:
    audio_url = rsp.output.audio.url
    print(f"URL: {audio_url}")
    audio_data = requests.get(audio_url).content
    with open(output_file, 'wb') as f:
        f.write(audio_data)
    
    # Check first few bytes
    with open(output_file, 'rb') as f:
        header = f.read(4)
        print(f"Header: {header}")
else:
    print(f"Error: {rsp.message}")
