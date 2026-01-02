# MathMaze TTS配音配置文档

本文档详细记录了游戏中各角色使用的TTS模型和音色配置，便于后续借鉴和拓展配音。

## 技术说明

- **TTS服务**: 阿里云 DashScope (qwen3-tts-flash-2025-11-27)
- **语言**: 中文 (Chinese)
- **调用方式**: Python脚本批量生成音频

---

## 一、病原体角色配音

### 音色分配规则

病原体根据**危险等级** (dangerLevel) 分配不同的音色：

| 危险等级 | 音色列表 | 角色数量 |
|---------|---------|---------|
| 1 | Cherry, Serena, Ethan, Chelsie, Momo, Nini, Bella | 11 |
| 2 | Vivian, Kai, Ryan, Nofish, Pip | 12 |
| 3 | Maia, Jennifer, Mochi, Bunny, Katerina | 16 |
| 4 | Aiden, Bellona, Vincent, Ebona, Arthur | 16 |
| 5 | Eldric Sage, Lenn, Ebona, Andre | 9 |

### 危险等级1 - 温和病原体 (11个)

| 角色ID | 角色名称 | 介绍语 | 使用音色 |
|-------|---------|--------|---------|
| e_coli | 大肠杆菌 | 嗨嗨！我是大肠杆菌，住在肠道里的小家伙~ 虽然我看起来很小，但我的家族可庞大啦！要不要跟我比一比谁能先占领这片领地呢？ | Cherry |
| staph_epidermidis | 表皮葡萄球菌 | 你好呀！我是表皮葡萄球菌，喜欢住在皮肤上开派对~ 我们圆圆的脑袋聚在一起，就像一串串小葡萄，可爱吧？ | Serena |
| strep_pneumoniae | 肺炎链球菌 | 嘿嘿，我是肺炎链球菌，住在肺部的好朋友~ 我喜欢手拉手排成一队，像小火车一样前进！你也来加入我们的队伍吧？ | Ethan |
| candida_albicans | 白色念珠菌 | 大家好！我是白色念珠菌，长得像小蘑菇一样可爱~ 我喜欢在温暖潮湿的地方安家，要不要来我的菌落做客呀？ | Chelsie |
| yeast | 酵母菌 | 我是酵母菌，会变魔法的小家伙~ 我能让面团变大变蓬松，不过在这里我只想和你玩一场有趣的游戏！ | Momo |
| rhinovirus | 鼻病毒 | 阿嚏！我是鼻病毒，专门爱让人打喷嚏~ 虽然我很小，但我的速度超快，想抓住我可不容易哦！ | Nini |
| adenovirus | 腺病毒 | 你好呀！我是腺病毒，有着超级可爱的小脸蛋~ 我喜欢到处冒险，你能跟上我的节奏吗？ | Bella |
| haemophilus | 流感嗜血杆菌 | 我是流感嗜血杆菌，虽然名字有点复杂，但我其实是很好相处的~ 喜欢和大家一起玩耍，来交个朋友吧！ | Cherry |
| moraxella | 卡他莫拉菌 | 哈喽！我是卡他莫拉菌，喜欢住在呼吸系统里~ 我的脾气可好了，就是有点调皮，想不想跟我玩躲猫猫？ | Serena |
| parainfluenza | 副流感病毒 | 我是副流感病毒，流感病毒的小表弟~ 我虽然个子小，但也会让人咳嗽哦！要不要来一场精彩的较量？ | Ethan |
| enterococcus | 肠球菌 | 嗨！我是肠球菌，肠道里的老住户啦~ 我很强壮，不怕环境变化，看看我们谁更厉害！ | Chelsie |

### 危险等级2 - 活泼病原体 (12个)

| 角色ID | 角色名称 | 介绍语 | 使用音色 |
|-------|---------|--------|---------|
| proteus | 变形杆菌 | 我是变形杆菌，就像变形金刚一样会变化形状~ 你永远猜不到我下一个动作是什么，哈哈哈！ | Vivian |
| influenza | 流感病毒 | 呼呼！我是流感病毒，每年都要出来搞点事情~ 我会变变变，让你怎么都防不住我！来吧，和我比一比谁的变化多！ | Kai |
| salmonella | 沙门氏菌 | 你好！我是沙门氏菌，喜欢藏在食物里搞恶作剧~ 我有尾巴会游泳，速度快得像闪电，你追不上我吧！ | Ryan |
| roundworm | 蛔虫 | 嗷呜！我是蛔虫，一条长长的虫子~ 我喜欢在肠道里扭来扭去，看我跳舞吧！想抓住我，可不容易哦~ | Nofish |
| h_pylori | 幽门螺杆菌 | 嗨嗨！我是幽门螺杆菌，住在胃里的勇士~ 胃酸都伤不到我，我很厉害吧？来挑战我看看！ | Pip |
| pertussis | 百日咳杆菌 | 咳咳咳！我是百日咳杆菌，专门让人咳个不停~ 我的声音可大啦，比我还吵的对手可不多见！ | Vivian |
| tetanus | 破伤风杆菌 | 我是破伤风杆菌，喜欢在泥土里睡觉~ 我会让人肌肉紧张绷绷的，就像我一样有力量！ | Kai |
| pseudomonas | 铜绿假单胞菌 | 嘿！我是铜绿假单胞菌，穿着绿色外衣的小家伙~ 我生命力超强，什么环境都能生存，跟我比比耐力吧！ | Ryan |
| hookworm | 钩虫 | 我是钩虫，嘴上有小钩子的小坏蛋~ 我喜欢挂在肠壁上，看我这个绝技，厉害吧？来试试能不能把我甩掉！ | Nofish |
| measles | 麻疹病毒 | 嘻嘻！我是麻疹病毒，喜欢在皮肤上画画~ 我会留下红色的小斑点，就像我的签名一样！ | Pip |
| varicella | 水痘-带状疱疹病毒 | 我是水痘-带状疱疹病毒，会让人身上长小水泡~ 我喜欢玩躲猫猫，有时候还会藏起来很久呢！ | Vivian |
| rsv | 呼吸道合胞病毒 | 你好！我是呼吸道合胞病毒，呼吸道里的常客~ 我喜欢和小细胞们融合在一起，变成更大的家族！ | Kai |
| mumps | 腮腺炎病毒 | 我是腮腺炎病毒，会让腮帮子鼓起来~ 看起来像仓鼠一样可爱，对吧？要不要跟我比比谁的腮帮子大？ | Ryan |

### 危险等级3 - 强力病原体 (16个)

| 角色ID | 角色名称 | 介绍语 | 使用音色 |
|-------|---------|--------|---------|
| golden_staph | 金黄色葡萄球菌 | 哇哦！我是金黄色葡萄球菌，穿着闪亮金色战衣的战士~ 我可厉害了，很多药物都对付不了我，敢不敢来试试？ | Maia |
| shigella | 痢疾杆菌 | 嘿嘿！我是痢疾杆菌，肠道里的小捣蛋~ 我会让肚子变得很不舒服，看你能坚持多久！ | Jennifer |
| typhoid | 伤寒杆菌 | 我是伤寒杆菌，历史悠久的对手~ 从古代开始我就让人闻风丧胆，你的实力能打败我吗？ | Mochi |
| cholera | 霍乱弧菌 | 嗨！我是霍乱弧菌，喜欢在水里游泳的小家伙~ 我长得像逗号，游得可快了，追不上我吧！ | Bunny |
| filarial_worm | 丝虫 | 我是丝虫，细长又优雅的舞者~ 我喜欢在淋巴系统里跳舞，我的舞姿很美，你不想看看吗？ | Katerina |
| chlamydia | 衣原体 | 你好！我是衣原体，像小细菌又像小病毒~ 我很小很小，需要用特殊方法才能看到我，神奇吧？ | Maia |
| leptospira_mild | 钩端螺旋体 | 我是钩端螺旋体，卷卷的像个小弹簧~ 我喜欢在脏水里玩耍，你敢不敢跟我来个比赛？ | Jennifer |
| candida_invasive | 侵袭性念珠菌 | 我是侵袭性念珠菌，念珠菌里的凶猛派~ 我不仅会待在表面，还会往深处钻，看我的厉害！ | Mochi |
| hepatitis | 肝炎病毒 | 我是肝炎病毒，喜欢住在肝脏里~ 我会让肝脏很辛苦，但我不坏，只是想找个地方住而已~ | Bunny |
| influenza_b | 乙型流感病毒 | 呼呼！我是乙型流感病毒，甲流的好兄弟~ 我们俩常常一起出来捣乱，你能同时打败我们两个吗？ | Katerina |
| polio | 脊髓灰质炎病毒 | 我是脊髓灰质炎病毒，专门攻击神经系统~ 我会让肌肉不听使唤，但如果你有疫苗，我就会跑掉！ | Maia |
| klebsiella | 肺炎克雷伯菌 | 你好！我是肺炎克雷伯菌，穿厚厚铠甲的战士~ 我有特殊的保护层，很多武器都打不穿我哦！ | Jennifer |
| marburg | 马尔堡病毒 | 嘿嘿嘿！我是马尔堡病毒，让人闻风丧胆的存在~ 我的力量超强，不过我相信你的智慧更强大，来较量吧！ | Mochi |
| tapeworm | 绦虫 | 我是绦虫，世界上最长的寄生虫之一~ 我有一节一节的身体，像火车一样长，你想数数我有多少节吗？ | Bunny |
| smallpox | 天花病毒 | 我是小痘病毒，曾经统治世界的王者~ 虽然疫苗已经把我打败了，但我还是想和你比一比！ | Katerina |
| rabies | 狂犬病毒 | 吼吼！我是狂犬病毒，最疯狂的家伙~ 我会让人变得很激动，像我一样充满活力！小心被我的热情传染哦！ | Maia |

### 危险等级4 - 危险病原体 (16个)

| 角色ID | 角色名称 | 介绍语 | 使用音色 |
|-------|---------|--------|---------|
| dengue | 登革热病毒 | 你好！我是登革热病毒，喜欢跟着蚊子到处旅行~ 我的身体会发热发烧，但我不想伤害谁，只是想找朋友！ | Aiden |
| west_nile | 西尼罗河病毒 | 我是西尼罗河病毒，来自远方的小客人~ 我喜欢跟着鸟类旅行，见识过很多地方，想听听我的故事吗？ | Bellona |
| yellow_fever | 黄热病病毒 | 嗨！我是黄热病病毒，穿黄色衣服的小家伙~ 我会让人发烧和变黄，就像我的衣服一样！ | Vincent |
| malaria | 疟原虫 | 我是疟原虫，让身体发热打摆子的小家伙~ 我喜欢躲在红细胞里玩捉迷藏，你能找到我吗？ | Ebona |
| trypanosome | 锥虫 | 我是锥虫，长着小尾巴的游泳健将~ 我喜欢在血液里游来游去，看我游得有多快！ | Arthur |
| legionella | 军团菌 | 我是军团菌，像军团一样强大的战士~ 我喜欢在空调系统里安家，凉爽又舒适，你也想加入我的军团吗？ | Aiden |
| sars | SARS病毒 | 我是SARS病毒，曾经引起全世界关注的家伙~ 我戴着皇冠，像病毒界的国王，但我相信你才是真正的主宰！ | Bellona |
| mers | MERS病毒 | 我是MERS病毒，SARS的兄弟~ 我们俩长得很像，但性格不太一样，你能分清我们吗？ | Vincent |
| zika_virus | 寨卡病毒 | 你好！我是寨卡病毒，来自热带的小客人~ 我喜欢跟着蚊子旅行，见过很多美丽的风景！ | Ebona |
| chikungunya | 基孔肯雅病毒 | 我是基孔肯雅病毒，名字有点复杂但我很好记~ 我会让关节很疼，但我不是故意的，只是想让你记住我！ | Arthur |
| leishmania | 利什曼原虫 | 我是利什曼原虫，皮肤上的小画家~ 我会留下特殊的印记，就像我的名片一样！ | Aiden |
| hiv | HIV病毒 | 嘿嘿，我是HIV病毒，免疫系统最狡猾的对手~ 我会悄悄地偷袭免疫细胞，让你不知不觉就输了！但我知道你比我更聪明！ | Bellona |
| ebola | 埃博拉病毒 | 吼吼！我是埃博拉病毒，最可怕的存在之一~ 我的速度超快，破坏力超强，但你别怕，我相信你有办法打败我！ | Vincent |
| anthrax_bacillus | 炭疽杆菌 | 我是炭疽杆菌，有着坚硬外壳的战士~ 我能形成孢子，在恶劣环境下也能存活，生命超顽强！ | Ebona |
| tuberculosis | 结核杆菌 | 你好！我是结核杆菌，会让人咳嗽很久的老对手~ 我很强壮，不怕药物，但我知道你有办法对付我！ | Arthur |
| mrsa | 耐甲氧西林金黄色葡萄球菌 | 嘿嘿！我是MRSA，超级细菌里的强者~ 很多药物都对付不了我，但我相信你的智慧更强大！ | Aiden |

### 危险等级5 - 极度危险病原体 (9个)

| 角色ID | 角色名称 | 介绍语 | 使用音色 |
|-------|---------|--------|---------|
| cre | 耐碳青霉烯肠杆菌 | 我是CRE，最强的超级细菌之一~ 几乎所有药物对我都没用，但我相信你会找到办法！ | Eldric Sage |
| lassa_fever | 拉沙热病毒 | 我是拉沙热病毒，来自非洲的危险访客~ 我会让身体很不舒服，但我不想伤害谁，只是想和你玩个游戏！ | Lenn |
| nipah_virus | 尼帕病毒 | 吼吼！我是尼帕病毒，最危险的存在之一~ 我来自蝙蝠朋友，虽然我很强大，但我相信你会更强大！ | Ebona |
| hantavirus | 汉坦病毒 | 我是汉坦病毒，跟着老鼠到处旅行的小家伙~ 我会让肺部受伤，但我不是故意的，只是想找个家！ | Andre |
| schistosoma | 血吸虫 | 我是血吸虫，喜欢在血液里游泳~ 我长得细长扁平，游起来可漂亮了，你想看看我的游泳技术吗？ | Eldric Sage |
| cysticercosis | 囊尾蚴 | 我是囊尾蚴，绦虫的宝宝~ 我长得圆圆的，像个小水泡，躲在身体深处玩捉迷藏，你能找到我吗？ | Lenn |
| trichinella | 旋毛虫 | 我是旋毛虫，喜欢在肌肉里打滚的小家伙~ 我会让人很疼，但我不想伤害谁，只是想找个舒服的地方！ | Ebona |

---

## 二、盟友角色配音

### 音色分配规则

盟友根据**力量等级** (powerLevel) 分配不同的音色：

| 力量等级 | 音色列表 | 角色数量 |
|---------|---------|---------|
| 1 | Cherry, Serena, Ethan, Chelsie, Momo, Nini, Bella | 5 |
| 2 | Vivian, Kai, Ryan, Nofish, Pip | 5 |
| 3 | Maia, Jennifer, Mochi, Bunny, Katerina | 5 |

### 力量等级1 - 益生菌 (5个)

| 角色ID | 角色名称 | 介绍语 | 使用音色 |
|-------|---------|--------|---------|
| lactobacillus | 乳杆菌 | 我是乳杆菌，肠道里的小伙伴~ 我喜欢喝牛奶，还能帮助消化！跟我做朋友，肚子会舒服哦~ | Cherry |
| bifidobacterium | 双歧杆菌 | 我是双歧杆菌，肠道里的守护者！我会帮你赶走坏细菌，让你的肠道健康又快乐！ | Serena |
| lactobacillus_rhamnosus | 鼠李糖乳杆菌 | 我是鼠李糖乳杆菌，名字虽然有点难记，但我很好相处哦！我会保护你的肠道，让你健康快乐！ | Ethan |
| lactobacillus_acidophilus | 嗜酸乳杆菌 | 我是嗜酸乳杆菌，酸酸甜甜是我的个性！我不仅可爱，还很强大，能帮你对抗很多敌人呢！ | Chelsie |
| saccharomyces | 布拉氏酵母菌 | 我是布拉氏酵母菌，来自酵母家族的小可爱！我虽然不像其他益生菌，但我也很强，能帮你战胜困难！ | Momo |

### 力量等级2 - 基础免疫细胞 (4个)

| 角色ID | 角色名称 | 介绍语 | 使用音色 |
|-------|---------|--------|---------|
| macrophage | 巨噬细胞 | 我是巨噬细胞，身体里的清道夫~ 我有一张大嘴，可以把坏蛋全部吃掉！别小看我，我的胃口可大啦！ | Vivian |
| neutrophil | 中性粒细胞 | 我是中性粒细胞，第一道防线的勇士！看到坏蛋我就冲上去，绝不退缩！跟我一起战斗吧！ | Kai |
| bcell | B淋巴细胞 | 我是B细胞，擅长制造武器！我会生产专门对付敌人的抗体，让我来保护你吧！ | Ryan |
| lactobacillus_acidophilus | 嗜酸乳杆菌 | 我是嗜酸乳杆菌，酸酸甜甜是我的个性！我不仅可爱，还很强大，能帮你对抗很多敌人呢！ | Nofish |

### 力量等级3 - 高级免疫细胞 (1个)

| 角色ID | 角色名称 | 介绍语 | 使用音色 |
|-------|---------|--------|---------|
| tcell | T淋巴细胞 | 我是T细胞，免疫系统的大脑！我能精准识别敌人，指挥战斗！跟我在一起，胜利就在眼前！ | Maia |
| nkcell | NK细胞 | 我是NK细胞，自然杀手！我不需要别人告诉我谁是敌人，我自己就能发现并消灭他们！ | Jennifer |

---

## 三、游戏事件配音

### 音色配置

所有游戏事件均使用统一音色: **Serena** (温柔小姐姐)

### 战斗事件 (11个)

| 文件名 | 语音内容 | 使用音色 |
|-------|---------|---------|
| correct.wav | 正确！ | Serena |
| wrong.wav | 不对哦， | Serena |
| enemy_attack_warning.wav | 小心！病原体攻来了！ | Serena |
| player_attack_turn.wav | 轮到你了！计算出正确的攻击力！ | Serena |
| player_defend_turn.wav | 敌人反击！ | Serena |
| hit_enemy.wav | 攻击命中！敌人受到了伤害！ | Serena |
| blocked_by_enemy.wav | 被格挡了！ | Serena |
| block_success.wav | 完美防御！ | Serena |
| take_damage.wav | 啊！受到了伤害！ | Serena |
| defeat_enemy.wav | 太好了！敌人被消灭了！ | Serena |
| combat_victory.wav | 战斗胜利！继续前进吧！ | Serena |
| combat_defeat.wav | 战斗失败...再试一次吧！ | Serena |

### 探索事件 (2个)

| 文件名 | 语音内容 | 使用音色 |
|-------|---------|---------|
| collect_ally.wav | 获得了新队友！ | Serena |
| find_exit.wav | 找到了出口！闯关成功！ | Serena |

### 游戏状态事件 (3个)

| 文件名 | 语音内容 | 使用音色 |
|-------|---------|---------|
| game_start.wav | 欢迎来到免疫迷宫！准备好保护身体了吗？ | Serena |
| game_victory.wav | 恭喜！你成功保护了器官！ | Serena |
| game_defeat.wav | 游戏结束...别灰心，再试一次！ | Serena |

### 关卡开始事件 (5个)

| 文件名 | 语音内容 | 使用音色 |
|-------|---------|---------|
| level_start_1.wav | 第一关开始！消灭所有病原体！ | Serena |
| level_start_2.wav | 第二关开始！消灭所有病原体！ | Serena |
| level_start_3.wav | 第三关开始！消灭所有病原体！ | Serena |
| level_start_4.wav | 第四关开始！消灭所有病原体！ | Serena |
| level_start_5.wav | 第五关开始！消灭所有病原体！ | Serena |

### BOSS事件 (2个)

| 文件名 | 语音内容 | 使用音色 |
|-------|---------|---------|
| boss_encounter.wav | 前方有强大的守关大将！小心应对！ | Serena |
| boss_defeated.wav | 太棒了！守关BOSS被击败了！出口现在畅通无阻！ | Serena |

---

## 四、数学题目配音

### 音色配置

所有数学题目均使用统一音色: **Cherry** (阳光积极、亲切自然小姐姐)

### 题目类型

- **出题音频**: "X加Y等于几" (X和Y为1-10的中文数字)
- **答案音频**: "X加Y等于Z" (Z为计算结果)

### 音量目录

- 出题音频: `public/audio/math/question/`
- 答案音频: `public/audio/math/answer/`

---

## 五、音色详细说明

### 常用音色特点

| 音色英文名 | 中文名 | 特点 | 适用场景 |
|-----------|--------|------|---------|
| Cherry | 芊悦 | 阳光积极、亲切自然小姐姐 | 温和角色、数学题目 |
| Serena | 苏瑶 | 温柔小姐姐 | 游戏事件、基础角色 |
| Ethan | 晨煦 | 标准普通话，阳光、温暖、活力 | 中等强度角色 |
| Chelsie | 千雪 | 二次元虚拟女友 | 可爱类角色 |
| Momo | 茉兔 | 撒娇搞怪，逗你开心 | 活泼角色 |
| Nini | 邻家妹妹 | 糯米糍一样又软又黏的嗓音 | 温柔角色 |
| Bella | 萌宝 | 喝酒不打醉拳的小萝莉 | 幼态角色 |
| Vivian | 十三 | 拽拽的、可爱的小暴躁 | 活泼调皮角色 |
| Kai | 凯 | 耳朵的一场SPA | 舒适类角色 |
| Ryan | 甜茶 | 节奏拉满，戏感炸裂 | 强烈情感角色 |
| Nofish | 不吃鱼 | 不会翘舌音的设计师 | 普通角色 |
| Pip | 顽屁小孩 | 调皮捣蛋却充满童真 | 儿童角色 |
| Maia | 四月 | 知性与温柔的碰撞 | 睿智角色 |
| Jennifer | 詹妮弗 | 品牌级、电影质感般美语女声 | 高级角色 |
| Mochi | 沙小弥 | 聪明伶俐的小大人 | 机智角色 |
| Bunny | 萌小姬 | "萌属性"爆棚的小萝莉 | 可爱角色 |
| Katerina | 卡捷琳娜 | 御姐音色，韵律回味十足 | 强力女性角色 |
| Aiden | 艾登 | 精通厨艺的美语大男孩 | 友善男性角色 |
| Bellona | 燕铮莺 | 声音洪亮，吐字清晰 | 气势角色 |
| Vincent | 田叔 | 一口独特的沙哑烟嗓 | 成熟男性角色 |
| Ebona | 诡婆婆 | 低语像一把生锈的钥匙 | 神秘角色 |
| Arthur | 徐大爷 | 被岁月和旱烟浸泡过的质朴嗓音 | 老者角色 |
| Eldric Sage | 沧明子 | 沉稳睿智的老者，沧桑如松却心明如镜 | 智者角色 |
| Lenn | 莱恩 | 理性是底色，叛逆藏在细节里 | 理性角色 |
| Andre | 安德雷 | 声音磁性，自然舒服、沉稳男生 | 稳重角色 |

---

## 六、音色选择建议

### 根据角色特点选择

1. **温和友好**: Cherry, Serena, Ethan, Chelsie, Momo, Nini, Bella
2. **活泼调皮**: Vivian, Kai, Ryan, Nofish, Pip
3. **睿智强大**: Maia, Jennifer, Mochi, Bunny, Katerina
4. **成熟稳重**: Aiden, Bellona, Vincent, Arthur, Andre
5. **神秘特殊**: Ebona, Eldric Sage, Lenn

### 根据力量/危险等级选择

- **等级1**: 使用温和友好音色
- **等级2**: 使用活泼调皮音色
- **等级3**: 使用睿智强大音色
- **等级4**: 使用成熟稳重音色
- **等级5**: 使用神秘特殊音色

---

## 七、TTS生成脚本位置

| 脚本名称 | 功能 | 文件位置 |
|---------|------|---------|
| generate_tts.py | 生成病原体介绍音频 | scripts/generate_tts.py |
| generate_allies_tts.py | 生成盟友介绍音频 | scripts/generate_allies_tts.py |
| generate_event_tts.py | 生成游戏事件音频 | scripts/generate_event_tts.py |
| generate_math_tts.py | 生成数学题目音频 | scripts/generate_math_tts.py |
| generate_single_tts.py | 生成单个音频文件 | scripts/generate_single_tts.py |
| fix_hit_enemy_tts.py | 修复特定音频文件 | scripts/fix_hit_enemy_tts.py |
| test_tts.py | 测试TTS功能 | scripts/test_tts.py |

---

## 八、音频文件目录结构

```
public/audio/
├── intro/               # 角色介绍音频
│   ├── [病原体ID].wav  # 病原体介绍
│   └── [盟友ID].wav    # 盟友介绍
├── combat/             # 战斗事件音频
│   ├── correct.wav
│   ├── wrong.wav
│   └── ...
├── exploration/        # 探索事件音频
│   ├── collect_ally.wav
│   └── find_exit.wav
├── game/               # 游戏状态音频
│   ├── game_start.wav
│   ├── level_start_1.wav
│   └── ...
└── math/               # 数学题目音频
    ├── question/       # 出题音频
    │   └── question_X_Y.wav
    └── answer/         # 答案音频
        └── answer_X_Y_Z.wav
```

---

## 九、使用示例

### 生成单个TTS音频

```python
import dashscope

rsp = dashscope.MultiModalConversation.call(
    model='qwen3-tts-flash-2025-11-27',
    api_key='YOUR_API_KEY',
    text='你好，欢迎来到免疫迷宫！',
    voice='Serena',
    language_type='Chinese',
    stream=False
)
```

### 根据角色等级选择音色

```python
VOICE_MAPPING = {
    1: ['Cherry', 'Serena', 'Ethan', 'Chelsie', 'Momo', 'Nini', 'Bella'],
    2: ['Vivian', 'Kai', 'Ryan', 'Nofish', 'Pip'],
    3: ['Maia', 'Jennifer', 'Mochi', 'Bunny', 'Katerina'],
    4: ['Aiden', 'Bellona', 'Vincent', 'Ebona', 'Arthur'],
    5: ['Eldric Sage', 'Lenn', 'Ebona', 'Andre']
}

def get_voice_for_character(level: int, index: int) -> str:
    voices = VOICE_MAPPING.get(level, VOICE_MAPPING[1])
    return voices[index % len(voices)]
```

---

## 十、扩展建议

1. **新增角色时**: 根据角色特点参考"音色选择建议"章节选择合适音色
2. **调整音色**: 在对应的生成脚本中修改VOICE_MAPPING配置
3. **测试音色**: 使用test_tts.py脚本测试不同音色效果
4. **音频优化**: 如需调整特定角色的语音，可在介绍语中添加上下文词以改善读音
5. **批量生成**: 使用对应的生成脚本批量生成角色音频

---

**文档版本**: 1.0  
**最后更新**: 2026-01-02  
**维护者**: MathMaze开发团队
