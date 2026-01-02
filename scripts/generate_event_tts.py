import os
import time
import requests
import dashscope

dashscope.base_http_api_url = 'https://dashscope.aliyuncs.com/api/v1'

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COMBAT_DIR = os.path.join(PROJECT_ROOT, 'public', 'audio', 'combat')
EXPLORATION_DIR = os.path.join(PROJECT_ROOT, 'public', 'audio', 'exploration')
GAME_DIR = os.path.join(PROJECT_ROOT, 'public', 'audio', 'game')
API_KEY = os.getenv('DASHSCOPE_API_KEY')

if not API_KEY:
    print('错误: 请设置环境变量 DASHSCOPE_API_KEY')
    exit(1)

os.makedirs(COMBAT_DIR, exist_ok=True)
os.makedirs(EXPLORATION_DIR, exist_ok=True)
os.makedirs(GAME_DIR, exist_ok=True)

COMBAT_EVENTS = {
    'correct.wav': '正确！',
    'wrong.wav': '不对哦，',
    'enemy_attack_warning.wav': '小心！病原体攻来了！',
    'player_attack_turn.wav': '轮到你了！计算出正确的攻击力！',
    'player_defend_turn.wav': '敌人反击！',
    'hit_enemy.wav': '命中！敌人受到了伤害！',
    'blocked_by_enemy.wav': '被格挡了！',
    'block_success.wav': '完美防御！',
    'take_damage.wav': '啊！受到了伤害！',
    'defeat_enemy.wav': '太好了！敌人被消灭了！',
    'combat_victory.wav': '战斗胜利！继续前进吧！',
    'combat_defeat.wav': '战斗失败...再试一次吧！'
}

EXPLORATION_EVENTS = {
    'collect_ally.wav': '获得了新队友！',
    'find_exit.wav': '找到了出口！闯关成功！'
}

GAME_EVENTS = {
    'game_start.wav': '欢迎来到免疫迷宫！准备好保护身体了吗？',
    'game_victory.wav': '恭喜！你成功保护了器官！',
    'game_defeat.wav': '游戏结束...别灰心，再试一次！'
}

LEVEL_START_EVENTS = {
    'level_start_1.wav': '第一关开始！消灭所有病原体！',
    'level_start_2.wav': '第二关开始！消灭所有病原体！',
    'level_start_3.wav': '第三关开始！消灭所有病原体！',
    'level_start_4.wav': '第四关开始！消灭所有病原体！',
    'level_start_5.wav': '第五关开始！消灭所有病原体！'
}

BOSS_EVENTS = {
    'boss_encounter.wav': '前方有强大的守关大将！小心应对！',
    'boss_defeated.wav': '太棒了！守关BOSS被击败了！出口现在畅通无阻！'
}

def generate_tts(text: str, output_path: str, voice: str = 'Serena', max_retries: int = 5) -> bool:
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
    print(f'开始生成游戏事件 TTS 音频...\n')
    
    success_count = 0
    fail_count = 0
    total_count = len(COMBAT_EVENTS) + len(EXPLORATION_EVENTS) + len(GAME_EVENTS) + len(LEVEL_START_EVENTS) + len(BOSS_EVENTS)
    
    print(f'--- 战斗事件 ({len(COMBAT_EVENTS)}个) ---')
    for filename, text in COMBAT_EVENTS.items():
        output_path = os.path.join(COMBAT_DIR, filename)
        if generate_tts(text, output_path):
            success_count += 1
        else:
            fail_count += 1
        time.sleep(0.1)
    
    print(f'\n--- 探索事件 ({len(EXPLORATION_EVENTS)}个) ---')
    for filename, text in EXPLORATION_EVENTS.items():
        output_path = os.path.join(EXPLORATION_DIR, filename)
        if generate_tts(text, output_path):
            success_count += 1
        else:
            fail_count += 1
        time.sleep(0.1)
    
    print(f'\n--- 游戏状态事件 ({len(GAME_EVENTS)}个) ---')
    for filename, text in GAME_EVENTS.items():
        output_path = os.path.join(GAME_DIR, filename)
        if generate_tts(text, output_path):
            success_count += 1
        else:
            fail_count += 1
        time.sleep(0.1)
    
    print(f'\n--- 关卡开始事件 ({len(LEVEL_START_EVENTS)}个) ---')
    for filename, text in LEVEL_START_EVENTS.items():
        output_path = os.path.join(GAME_DIR, filename)
        if generate_tts(text, output_path):
            success_count += 1
        else:
            fail_count += 1
        time.sleep(0.1)
    
    print(f'\n--- BOSS事件 ({len(BOSS_EVENTS)}个) ---')
    for filename, text in BOSS_EVENTS.items():
        output_path = os.path.join(GAME_DIR, filename)
        if generate_tts(text, output_path):
            success_count += 1
        else:
            fail_count += 1
        time.sleep(0.1)
    
    print(f'\n完成! 成功: {success_count}/{total_count}, 失败: {fail_count}/{total_count}')
    print(f'战斗音频保存在: {COMBAT_DIR}')
    print(f'探索音频保存在: {EXPLORATION_DIR}')
    print(f'游戏音频保存在: {GAME_DIR}')

if __name__ == '__main__':
    main()
