import os
import time
import requests
import dashscope

dashscope.base_http_api_url = 'https://dashscope.aliyuncs.com/api/v1'

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'public', 'audio', 'intro')
API_KEY = os.getenv('DASHSCOPE_API_KEY')

if not API_KEY:
    print('错误: 请设置环境变量 DASHSCOPE_API_KEY')
    exit(1)

os.makedirs(OUTPUT_DIR, exist_ok=True)

IMMUNE_CELLS = [
    {'id': 'macrophage', 'name': '巨噬细胞', 'intro': '我是巨噬细胞，身体里的清道夫~ 我有一张大嘴，可以把坏蛋全部吃掉！别小看我，我的胃口可大啦！', 'powerLevel': 2},
    {'id': 'neutrophil', 'name': '中性粒细胞', 'intro': '我是中性粒细胞，第一道防线的勇士！看到坏蛋我就冲上去，绝不退缩！跟我一起战斗吧！', 'powerLevel': 2},
    {'id': 'tcell', 'name': 'T淋巴细胞', 'intro': '我是T细胞，免疫系统的大脑！我能精准识别敌人，指挥战斗！跟我在一起，胜利就在眼前！', 'powerLevel': 3},
    {'id': 'bcell', 'name': 'B淋巴细胞', 'intro': '我是B细胞，擅长制造武器！我会生产专门对付敌人的抗体，让我来保护你吧！', 'powerLevel': 2},
    {'id': 'nkcell', 'name': 'NK细胞', 'intro': '我是NK细胞，自然杀手！我不需要别人告诉我谁是敌人，我自己就能发现并消灭他们！', 'powerLevel': 3}
]

PROBIOTICS = [
    {'id': 'lactobacillus', 'name': '乳杆菌', 'intro': '我是乳杆菌，肠道里的小伙伴~ 我喜欢喝牛奶，还能帮助消化！跟我做朋友，肚子会舒服哦~', 'powerLevel': 1},
    {'id': 'bifidobacterium', 'name': '双歧杆菌', 'intro': '我是双歧杆菌，肠道里的守护者！我会帮你赶走坏细菌，让你的肠道健康又快乐！', 'powerLevel': 1},
    {'id': 'lactobacillus_acidophilus', 'name': '嗜酸乳杆菌', 'intro': '我是嗜酸乳杆菌，酸酸甜甜是我的个性！我不仅可爱，还很强大，能帮你对抗很多敌人呢！', 'powerLevel': 2},
    {'id': 'lactobacillus_rhamnosus', 'name': '鼠李糖乳杆菌', 'intro': '我是鼠李糖乳杆菌，名字虽然有点难记，但我很好相处哦！我会保护你的肠道，让你健康快乐！', 'powerLevel': 1},
    {'id': 'saccharomyces', 'name': '布拉氏酵母菌', 'intro': '我是布拉氏酵母菌，来自酵母家族的小可爱！我虽然不像其他益生菌，但我也很强，能帮你战胜困难！', 'powerLevel': 2}
]

VOICE_MAPPING = {
    1: ['Cherry', 'Serena', 'Ethan', 'Chelsie', 'Momo', 'Nini', 'Bella'],
    2: ['Vivian', 'Kai', 'Ryan', 'Nofish', 'Pip'],
    3: ['Maia', 'Jennifer', 'Mochi', 'Bunny', 'Katerina']
}

def get_voice_for_ally(power_level: int, index: int) -> str:
    voices = VOICE_MAPPING.get(power_level, VOICE_MAPPING[1])
    return voices[index % len(voices)]

def generate_audio_for_ally(ally: dict, index: int, ally_type: str, max_retries: int = 5) -> bool:
    ally_id = ally['id']
    name = ally['name']
    intro = ally['intro']
    power_level = ally['powerLevel']
    
    output_path = os.path.join(OUTPUT_DIR, f'{ally_id}.wav')
    
    if os.path.exists(output_path):
        print(f'✓ 跳过已存在: {name} ({ally_id})')
        return True
    
    voice = get_voice_for_ally(power_level, index)
    
    for attempt in range(max_retries):
        print(f'正在生成: {name} ({ally_id}) - 音色: {voice}')
        if attempt > 0:
            print(f'  重试 {attempt + 1}/{max_retries}...')
        
        try:
            rsp = dashscope.MultiModalConversation.call(
                model='qwen3-tts-flash-2025-11-27',
                api_key=API_KEY,
                text=intro,
                voice=voice,
                language_type='Chinese',
                stream=False
            )
            
            if rsp.status_code == 200:
                audio_url = rsp.output.audio.url
                audio_data = requests.get(audio_url).content
                with open(output_path, 'wb') as f:
                    f.write(audio_data)
                print(f'✓ 完成: {name} ({ally_id})')
                return True
            else:
                if 'rate limit' in rsp.message.lower() and attempt < max_retries - 1:
                    wait_time = 2 ** (attempt + 1)
                    print(f'  频率限制，等待 {wait_time} 秒后重试...')
                    time.sleep(wait_time)
                    continue
                print(f'✗ 失败: {name} ({ally_id}) - {rsp.message}')
                return False
                
        except Exception as e:
            print(f'✗ 错误: {name} ({ally_id}) - {str(e)}')
            if attempt < max_retries - 1:
                wait_time = 2 ** (attempt + 1)
                time.sleep(wait_time)
                continue
            return False
    
    return False

def main():
    print(f'开始生成 {len(IMMUNE_CELLS) + len(PROBIOTICS)} 个盟友的 TTS 音频...\n')
    
    success_count = 0
    fail_count = 0
    
    print('=== 生成白细胞音频 ===')
    for i, cell in enumerate(IMMUNE_CELLS):
        if generate_audio_for_ally(cell, i, 'immune'):
            success_count += 1
        else:
            fail_count += 1
        time.sleep(0.1)
    
    print('\n=== 生成益生菌音频 ===')
    for i, probiotic in enumerate(PROBIOTICS):
        if generate_audio_for_ally(probiotic, i + len(IMMUNE_CELLS), 'probiotic'):
            success_count += 1
        else:
            fail_count += 1
        time.sleep(0.1)
    
    print(f'\n完成! 成功: {success_count}, 失败: {fail_count}')
    print(f'音频文件保存在: {OUTPUT_DIR}')

if __name__ == '__main__':
    main()
