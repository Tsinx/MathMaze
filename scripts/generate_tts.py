import os
import time
import requests
import dashscope

dashscope.base_http_api_url = 'https://dashscope.aliyuncs.com/api/v1'

OUTPUT_DIR = 'public/audio/intro'
API_KEY = os.getenv('DASHSCOPE_API_KEY')

if not API_KEY:
    print('错误: 请设置环境变量 DASHSCOPE_API_KEY')
    exit(1)

os.makedirs(OUTPUT_DIR, exist_ok=True)

VOICE_MAPPING = {
    1: ['Cherry', 'Serena', 'Ethan', 'Chelsie', 'Momo', 'Nini', 'Bella'],
    2: ['Vivian', 'Kai', 'Ryan', 'Nofish', 'Pip'],
    3: ['Maia', 'Jennifer', 'Mochi', 'Bunny', 'Katerina'],
    4: ['Aiden', 'Bellona', 'Vincent', 'Ebona', 'Arthur'],
    5: ['Eldric Sage', 'Lenn', 'Ebona', 'Andre']
}

PATHOGENS = [
    {'id': 'e_coli', 'name': '大肠杆菌', 'intro': '嗨嗨！我是大肠杆菌，住在肠道里的小家伙~ 虽然我看起来很小，但我的家族可庞大啦！要不要跟我比一比谁能先占领这片领地呢？', 'dangerLevel': 1},
    {'id': 'staph_epidermidis', 'name': '表皮葡萄球菌', 'intro': '你好呀！我是表皮葡萄球菌，喜欢住在皮肤上开派对~ 我们圆圆的脑袋聚在一起，就像一串串小葡萄，可爱吧？', 'dangerLevel': 1},
    {'id': 'strep_pneumoniae', 'name': '肺炎链球菌', 'intro': '嘿嘿，我是肺炎链球菌，住在肺部的好朋友~ 我喜欢手拉手排成一队，像小火车一样前进！你也来加入我们的队伍吧？', 'dangerLevel': 1},
    {'id': 'candida_albicans', 'name': '白色念珠菌', 'intro': '大家好！我是白色念珠菌，长得像小蘑菇一样可爱~ 我喜欢在温暖潮湿的地方安家，要不要来我的菌落做客呀？', 'dangerLevel': 1},
    {'id': 'yeast', 'name': '酵母菌', 'intro': '我是酵母菌，会变魔法的小家伙~ 我能让面团变大变蓬松，不过在这里我只想和你玩一场有趣的游戏！', 'dangerLevel': 1},
    {'id': 'rhinovirus', 'name': '鼻病毒', 'intro': '阿嚏！我是鼻病毒，专门爱让人打喷嚏~ 虽然我很小，但我的速度超快，想抓住我可不容易哦！', 'dangerLevel': 1},
    {'id': 'adenovirus', 'name': '腺病毒', 'intro': '你好呀！我是腺病毒，有着超级可爱的小脸蛋~ 我喜欢到处冒险，你能跟上我的节奏吗？', 'dangerLevel': 1},
    {'id': 'haemophilus', 'name': '流感嗜血杆菌', 'intro': '我是流感嗜血杆菌，虽然名字有点复杂，但我其实是很好相处的~ 喜欢和大家一起玩耍，来交个朋友吧！', 'dangerLevel': 1},
    {'id': 'moraxella', 'name': '卡他莫拉菌', 'intro': '哈喽！我是卡他莫拉菌，喜欢住在呼吸系统里~ 我的脾气可好了，就是有点调皮，想不想跟我玩躲猫猫？', 'dangerLevel': 1},
    {'id': 'parainfluenza', 'name': '副流感病毒', 'intro': '我是副流感病毒，流感病毒的小表弟~ 我虽然个子小，但也会让人咳嗽哦！要不要来一场精彩的较量？', 'dangerLevel': 1},
    {'id': 'enterococcus', 'name': '肠球菌', 'intro': '嗨！我是肠球菌，肠道里的老住户啦~ 我很强壮，不怕环境变化，看看我们谁更厉害！', 'dangerLevel': 1},
    {'id': 'proteus', 'name': '变形杆菌', 'intro': '我是变形杆菌，就像变形金刚一样会变化形状~ 你永远猜不到我下一个动作是什么，哈哈哈！', 'dangerLevel': 1},
    {'id': 'influenza', 'name': '流感病毒', 'intro': '呼呼！我是流感病毒，每年都要出来搞点事情~ 我会变变变，让你怎么都防不住我！来吧，和我比一比谁的变化多！', 'dangerLevel': 2},
    {'id': 'salmonella', 'name': '沙门氏菌', 'intro': '你好！我是沙门氏菌，喜欢藏在食物里搞恶作剧~ 我有尾巴会游泳，速度快得像闪电，你追不上我吧！', 'dangerLevel': 2},
    {'id': 'roundworm', 'name': '蛔虫', 'intro': '嗷呜！我是蛔虫，一条长长的虫子~ 我喜欢在肠道里扭来扭去，看我跳舞吧！想抓住我，可不容易哦~', 'dangerLevel': 2},
    {'id': 'h_pylori', 'name': '幽门螺杆菌', 'intro': '嗨嗨！我是幽门螺杆菌，住在胃里的勇士~ 胃酸都伤不到我，我很厉害吧？来挑战我看看！', 'dangerLevel': 2},
    {'id': 'pertussis', 'name': '百日咳杆菌', 'intro': '咳咳咳！我是百日咳杆菌，专门让人咳个不停~ 我的声音可大啦，比我还吵的对手可不多见！', 'dangerLevel': 2},
    {'id': 'tetanus', 'name': '破伤风杆菌', 'intro': '我是破伤风杆菌，喜欢在泥土里睡觉~ 我会让人肌肉紧张绷绷的，就像我一样有力量！', 'dangerLevel': 2},
    {'id': 'pseudomonas', 'name': '铜绿假单胞菌', 'intro': '嘿！我是铜绿假单胞菌，穿着绿色外衣的小家伙~ 我生命力超强，什么环境都能生存，跟我比比耐力吧！', 'dangerLevel': 2},
    {'id': 'hookworm', 'name': '钩虫', 'intro': '我是钩虫，嘴上有小钩子的小坏蛋~ 我喜欢挂在肠壁上，看我这个绝技，厉害吧？来试试能不能把我甩掉！', 'dangerLevel': 2},
    {'id': 'measles', 'name': '麻疹病毒', 'intro': '嘻嘻！我是麻疹病毒，喜欢在皮肤上画画~ 我会留下红色的小斑点，就像我的签名一样！', 'dangerLevel': 2},
    {'id': 'varicella', 'name': '水痘-带状疱疹病毒', 'intro': '我是水痘-带状疱疹病毒，会让人身上长小水泡~ 我喜欢玩躲猫猫，有时候还会藏起来很久呢！', 'dangerLevel': 2},
    {'id': 'rsv', 'name': '呼吸道合胞病毒', 'intro': '你好！我是呼吸道合胞病毒，呼吸道里的常客~ 我喜欢和小细胞们融合在一起，变成更大的家族！', 'dangerLevel': 2},
    {'id': 'mumps', 'name': '腮腺炎病毒', 'intro': '我是腮腺炎病毒，会让腮帮子鼓起来~ 看起来像仓鼠一样可爱，对吧？要不要跟我比比谁的腮帮子大？', 'dangerLevel': 2},
    {'id': 'golden_staph', 'name': '金黄色葡萄球菌', 'intro': '哇哦！我是金黄色葡萄球菌，穿着闪亮金色战衣的战士~ 我可厉害了，很多药物都对付不了我，敢不敢来试试？', 'dangerLevel': 3},
    {'id': 'shigella', 'name': '痢疾杆菌', 'intro': '嘿嘿！我是痢疾杆菌，肠道里的小捣蛋~ 我会让肚子变得很不舒服，看你能坚持多久！', 'dangerLevel': 3},
    {'id': 'typhoid', 'name': '伤寒杆菌', 'intro': '我是伤寒杆菌，历史悠久的对手~ 从古代开始我就让人闻风丧胆，你的实力能打败我吗？', 'dangerLevel': 3},
    {'id': 'cholera', 'name': '霍乱弧菌', 'intro': '嗨！我是霍乱弧菌，喜欢在水里游泳的小家伙~ 我长得像逗号，游得可快了，追不上我吧！', 'dangerLevel': 3},
    {'id': 'filarial_worm', 'name': '丝虫', 'intro': '我是丝虫，细长又优雅的舞者~ 我喜欢在淋巴系统里跳舞，我的舞姿很美，你不想看看吗？', 'dangerLevel': 3},
    {'id': 'chlamydia', 'name': '衣原体', 'intro': '你好！我是衣原体，像小细菌又像小病毒~ 我很小很小，需要用特殊方法才能看到我，神奇吧？', 'dangerLevel': 3},
    {'id': 'leptospira_mild', 'name': '钩端螺旋体', 'intro': '我是钩端螺旋体，卷卷的像个小弹簧~ 我喜欢在脏水里玩耍，你敢不敢跟我来个比赛？', 'dangerLevel': 3},
    {'id': 'candida_invasive', 'name': '侵袭性念珠菌', 'intro': '我是侵袭性念珠菌，念珠菌里的凶猛派~ 我不仅会待在表面，还会往深处钻，看我的厉害！', 'dangerLevel': 3},
    {'id': 'hepatitis', 'name': '肝炎病毒', 'intro': '我是肝炎病毒，喜欢住在肝脏里~ 我会让肝脏很辛苦，但我不坏，只是想找个地方住而已~', 'dangerLevel': 3},
    {'id': 'influenza_b', 'name': '乙型流感病毒', 'intro': '呼呼！我是乙型流感病毒，甲流的好兄弟~ 我们俩常常一起出来捣乱，你能同时打败我们两个吗？', 'dangerLevel': 3},
    {'id': 'polio', 'name': '脊髓灰质炎病毒', 'intro': '我是脊髓灰质炎病毒，专门攻击神经系统~ 我会让肌肉不听使唤，但如果你有疫苗，我就会跑掉！', 'dangerLevel': 3},
    {'id': 'klebsiella', 'name': '肺炎克雷伯菌', 'intro': '你好！我是肺炎克雷伯菌，穿厚厚铠甲的战士~ 我有特殊的保护层，很多武器都打不穿我哦！', 'dangerLevel': 3},
    {'id': 'marburg', 'name': '马尔堡病毒', 'intro': '嘿嘿嘿！我是马尔堡病毒，让人闻风丧胆的存在~ 我的力量超强，不过我相信你的智慧更强大，来较量吧！', 'dangerLevel': 4},
    {'id': 'tapeworm', 'name': '绦虫', 'intro': '我是绦虫，世界上最长的寄生虫之一~ 我有一节一节的身体，像火车一样长，你想数数我有多少节吗？', 'dangerLevel': 4},
    {'id': 'smallpox', 'name': '天花病毒', 'intro': '我是天花病毒，曾经统治世界的王者~ 虽然疫苗已经把我打败了，但我还是想和你比一比！', 'dangerLevel': 4},
    {'id': 'rabies', 'name': '狂犬病毒', 'intro': '吼吼！我是狂犬病毒，最疯狂的家伙~ 我会让人变得很激动，像我一样充满活力！小心被我的热情传染哦！', 'dangerLevel': 4},
    {'id': 'dengue', 'name': '登革热病毒', 'intro': '你好！我是登革热病毒，喜欢跟着蚊子到处旅行~ 我的身体会发热发烧，但我不想伤害谁，只是想找朋友！', 'dangerLevel': 4},
    {'id': 'west_nile', 'name': '西尼罗河病毒', 'intro': '我是西尼罗河病毒，来自远方的小客人~ 我喜欢跟着鸟类旅行，见识过很多地方，想听听我的故事吗？', 'dangerLevel': 4},
    {'id': 'yellow_fever', 'name': '黄热病病毒', 'intro': '嗨！我是黄热病病毒，穿黄色衣服的小家伙~ 我会让人发烧和变黄，就像我的衣服一样！', 'dangerLevel': 4},
    {'id': 'malaria', 'name': '疟原虫', 'intro': '我是疟原虫，让身体发热打摆子的小家伙~ 我喜欢躲在红细胞里玩捉迷藏，你能找到我吗？', 'dangerLevel': 4},
    {'id': 'trypanosome', 'name': '锥虫', 'intro': '我是锥虫，长着小尾巴的游泳健将~ 我喜欢在血液里游来游去，看我游得有多快！', 'dangerLevel': 4},
    {'id': 'legionella', 'name': '军团菌', 'intro': '我是军团菌，像军团一样强大的战士~ 我喜欢在空调系统里安家，凉爽又舒适，你也想加入我的军团吗？', 'dangerLevel': 4},
    {'id': 'sars', 'name': 'SARS病毒', 'intro': '我是SARS病毒，曾经引起全世界关注的家伙~ 我戴着皇冠，像病毒界的国王，但我相信你才是真正的主宰！', 'dangerLevel': 4},
    {'id': 'mers', 'name': 'MERS病毒', 'intro': '我是MERS病毒，SARS的兄弟~ 我们俩长得很像，但性格不太一样，你能分清我们吗？', 'dangerLevel': 4},
    {'id': 'zika_virus', 'name': '寨卡病毒', 'intro': '你好！我是寨卡病毒，来自热带的小客人~ 我喜欢跟着蚊子旅行，见过很多美丽的风景！', 'dangerLevel': 4},
    {'id': 'chikungunya', 'name': '基孔肯雅病毒', 'intro': '我是基孔肯雅病毒，名字有点复杂但我很好记~ 我会让关节很疼，但我不是故意的，只是想让你记住我！', 'dangerLevel': 4},
    {'id': 'leishmania', 'name': '利什曼原虫', 'intro': '我是利什曼原虫，皮肤上的小画家~ 我会留下特殊的印记，就像我的名片一样！', 'dangerLevel': 4},
    {'id': 'hiv', 'name': 'HIV病毒', 'intro': '嘿嘿，我是HIV病毒，免疫系统最狡猾的对手~ 我会悄悄地偷袭免疫细胞，让你不知不觉就输了！但我知道你比我更聪明！', 'dangerLevel': 5},
    {'id': 'ebola', 'name': '埃博拉病毒', 'intro': '吼吼！我是埃博拉病毒，最可怕的存在之一~ 我的速度超快，破坏力超强，但你别怕，我相信你有办法打败我！', 'dangerLevel': 5},
    {'id': 'anthrax_bacillus', 'name': '炭疽杆菌', 'intro': '我是炭疽杆菌，有着坚硬外壳的战士~ 我能形成孢子，在恶劣环境下也能存活，生命超顽强！', 'dangerLevel': 5},
    {'id': 'tuberculosis', 'name': '结核杆菌', 'intro': '你好！我是结核杆菌，会让人咳嗽很久的老对手~ 我很强壮，不怕药物，但我知道你有办法对付我！', 'dangerLevel': 5},
    {'id': 'mrsa', 'name': '耐甲氧西林金黄色葡萄球菌', 'intro': '嘿嘿！我是MRSA，超级细菌里的强者~ 很多药物都对付不了我，但我相信你的智慧更强大！', 'dangerLevel': 5},
    {'id': 'cre', 'name': '耐碳青霉烯肠杆菌', 'intro': '我是CRE，最强的超级细菌之一~ 几乎所有药物对我都没用，但我相信你会找到办法！', 'dangerLevel': 5},
    {'id': 'lassa_fever', 'name': '拉沙热病毒', 'intro': '我是拉沙热病毒，来自非洲的危险访客~ 我会让身体很不舒服，但我不想伤害谁，只是想和你玩个游戏！', 'dangerLevel': 5},
    {'id': 'nipah_virus', 'name': '尼帕病毒', 'intro': '吼吼！我是尼帕病毒，最危险的存在之一~ 我来自蝙蝠朋友，虽然我很强大，但我相信你会更强大！', 'dangerLevel': 5},
    {'id': 'hantavirus', 'name': '汉坦病毒', 'intro': '我是汉坦病毒，跟着老鼠到处旅行的小家伙~ 我会让肺部受伤，但我不是故意的，只是想找个家！', 'dangerLevel': 5},
    {'id': 'schistosoma', 'name': '血吸虫', 'intro': '我是血吸虫，喜欢在血液里游泳~ 我长得细长扁平，游起来可漂亮了，你想看看我的游泳技术吗？', 'dangerLevel': 5},
    {'id': 'cysticercosis', 'name': '囊尾蚴', 'intro': '我是囊尾蚴，绦虫的宝宝~ 我长得圆圆的，像个小水泡，躲在身体深处玩捉迷藏，你能找到我吗？', 'dangerLevel': 5},
    {'id': 'trichinella', 'name': '旋毛虫', 'intro': '我是旋毛虫，喜欢在肌肉里打滚的小家伙~ 我会让人很疼，但我不想伤害谁，只是想找个舒服的地方！', 'dangerLevel': 5}
]

def get_voice_for_pathogen(danger_level: int, index: int) -> str:
    voices = VOICE_MAPPING.get(danger_level, VOICE_MAPPING[1])
    return voices[index % len(voices)]

def generate_audio_for_pathogen(pathogen: dict, index: int, max_retries: int = 5) -> bool:
    enemy_id = pathogen['id']
    name = pathogen['name']
    intro = pathogen['intro']
    danger_level = pathogen['dangerLevel']
    
    output_path = os.path.join(OUTPUT_DIR, f'{enemy_id}.wav')
    
    if os.path.exists(output_path):
        print(f'✓ 跳过已存在: {name} ({enemy_id})')
        return True
    
    voice = get_voice_for_pathogen(danger_level, index)
    
    for attempt in range(max_retries):
        print(f'正在生成: {name} ({enemy_id}) - 音色: {voice}')
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
                print(f'✓ 完成: {name} ({enemy_id})')
                return True
            else:
                if 'rate limit' in rsp.message.lower() and attempt < max_retries - 1:
                    wait_time = 2 ** (attempt + 1)
                    print(f'  频率限制，等待 {wait_time} 秒后重试...')
                    time.sleep(wait_time)
                    continue
                print(f'✗ 失败: {name} ({enemy_id}) - {rsp.message}')
                return False
                
        except Exception as e:
            print(f'✗ 错误: {name} ({enemy_id}) - {str(e)}')
            if attempt < max_retries - 1:
                wait_time = 2 ** (attempt + 1)
                time.sleep(wait_time)
                continue
            return False
    
    return False

def main():
    print(f'开始生成 {len(PATHOGENS)} 个病原体的 TTS 音频...\n')
    
    success_count = 0
    fail_count = 0
    
    for i, pathogen in enumerate(PATHOGENS):
        if generate_audio_for_pathogen(pathogen, i):
            success_count += 1
        else:
            fail_count += 1
        
        time.sleep(0.1)
    
    print(f'\n完成! 成功: {success_count}, 失败: {fail_count}')
    print(f'音频文件保存在: {OUTPUT_DIR}')

if __name__ == '__main__':
    main()
