import os
import requests
import dashscope

API_KEY = os.getenv("DASHSCOPE_API_KEY")

if not API_KEY:
    print('错误: 请设置环境变量 DASHSCOPE_API_KEY')
    exit(1)

text = "你好世界"

print(f'开始测试: {text}')
print(f'API Key: {API_KEY[:20]}...')

rsp = dashscope.MultiModalConversation.call(
    model='qwen3-tts-flash',
    api_key=API_KEY,
    text=text,
    voice="Cherry",
    language_type="Chinese",
    stream=False
)

print(f'\n响应类型: {type(rsp)}')
print(f'响应状态码: {rsp.status_code}')
print(f'响应消息: {rsp.message}')

if rsp.output:
    audio_url = rsp.output.audio.url
    print(f'音频URL: {audio_url}')
    
    audio_data = requests.get(audio_url).content
    output_file = "test_output.mp3"
    with open(output_file, 'wb') as f:
        f.write(audio_data)
    print(f'已保存到: {output_file}')
