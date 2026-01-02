# 加法口诀配音+游戏事件配音系统实施计划

## 一、音频文件总计：322个

### 1. 加法式子音频（200个）
```
public/audio/math/
├── question/           # 出题音频（100个）
│   ├── question_1_1.wav   # "一加一等于几"
│   ├── question_1_2.wav   # "一加二等于几"
│   └── ... (a=1..10, b=1..10)
└── answer/            # 答案音频（100个）
    ├── answer_1_1_2.wav   # "一加一等于二"
    ├── answer_1_2_3.wav   # "一加二等于三"
    └── ... (a=1..10, b=1..10, c=a+b)
```

### 2. 战斗事件音频（14个）
```
public/audio/combat/
├── correct.wav              # "正确！"
├── wrong.wav                # "不对哦，"
├── enemy_attack_warning.wav  # "小心！病原体攻来了！"
├── player_attack_turn.wav    # "轮到你了！计算出正确的攻击力！"
├── player_defend_turn.wav    # "敌人反击！快速计算出防御值！"
├── hit_enemy.wav            # "命中！敌人受到了伤害！"
├── blocked_by_enemy.wav      # "被格挡了！"
├── block_success.wav        # "完美防御！"
├── take_damage.wav          # "啊！受到了伤害！"
├── defeat_enemy.wav         # "太好了！敌人被消灭了！"
├── combat_victory.wav       # "战斗胜利！继续前进吧！"
└── combat_defeat.wav        # "战斗失败...再试一次吧！"
```

### 3. 探索事件音频（2个）
```
public/audio/exploration/
├── collect_ally.wav         # "获得了新队友！"
└── find_exit.wav           # "找到了出口！闯关成功！"
```

### 4. 游戏状态音频（6个）
```
public/audio/game/
├── game_start.wav          # "欢迎来到免疫迷宫！准备好保护身体了吗？"
├── level_start_1.wav      # "第一关开始！消灭所有病原体！"
├── level_start_2.wav      # "第二关开始！消灭所有病原体！"
├── level_start_3.wav      # "第三关开始！消灭所有病原体！"
├── level_start_4.wav      # "第四关开始！消灭所有病原体！"
├── level_start_5.wav      # "第五关开始！消灭所有病原体！"
├── game_victory.wav       # "恭喜！你成功保护了器官！"
└── game_defeat.wav        # "游戏结束...别灰心，再试一次！"
```

---

## 二、播放流程

### 加法式子流程
```
出题（3+2=？）
  ↓
播放："三加二等于几"
  ↓
玩家选择答案（5）
  ↓
【答对】
  ↓
playCorrect()音效 + "正确！" + "三加二等于五"
  ↓
攻击命中/防御成功

【答错】
  ↓
playWrong()音效 + "不对哦，" + "三加二等于五"
  ↓
攻击被格挡/受到伤害
```

---

## 三、实施步骤

### Step 1: 创建TTS生成脚本
- `scripts/generate_math_tts.py` - 生成200个加法式子音频
  - 出题：100个 "X加X等于几"
  - 答案：100个 "X加X等于X"
  - 使用音色："Cherry"（友好、清晰）

- `scripts/generate_event_tts.py` - 生成122个事件音频
  - 战斗事件：14个
  - 探索事件：2个
  - 游戏状态：6个（包含5个关卡开始音频）
  - 使用音色："Serena"（统一、友好）

### Step 2: 创建音频播放管理器
- `src/utils/AudioManager.ts`
  - `playQuestion(a, b)` - 播放出题音频
  - `playAnswer(a, b, c, isCorrect)` - 播放答案（自动拼接正确/错误+式子）
  - `playEvent(eventId)` - 同步播放游戏事件
  - `playEventAsync(eventId)` - 异步播放游戏事件（返回Promise）
  - `playSequence(audioPaths[])` - 序列播放多个音频

### Step 3: 更新gameStore
- 导入AudioManager并初始化
- `answerQuestion()` 中：
  - 出题时：`audioManager.playQuestion(operand1, operand2)`
  - 答对：`soundManager.playCorrect()` + `audioManager.playAnswer(a, b, c, true)`
  - 答错：`soundManager.playWrong()` + `audioManager.playAnswer(a, b, c, false)`
- 其他事件：在相应位置调用 `playEvent()` 或 `playEventAsync()`

### Step 4: 更新游戏页面
- HomePage: 播放 `game_start`
- GamePage: 关卡开始时播放 `level_start_{level}`
- VictoryPage: 播放 `game_victory`
- DefeatPage: 播放 `game_defeat`

### Step 5: 音色选择
- 加法式子：`Cherry`（儿童友好、清晰）
- 游戏事件：`Serena`（统一、友好）
- 病原体介绍：保持现有方案（按危险等级分配）

---

## 四、文件修改清单

1. **新建**: `scripts/generate_math_tts.py` - 生成加法式子音频
2. **新建**: `scripts/generate_event_tts.py` - 生成游戏事件音频
3. **新建**: `src/utils/AudioManager.ts` - 统一音频管理器
4. **修改**: `src/store/gameStore.ts` - 集成音频播放调用
5. **修改**: `src/pages/HomePage.tsx` - 游戏开始配音
6. **修改**: `src/pages/GamePage.tsx` - 关卡开始配音
7. **修改**: `src/pages/VictoryPage.tsx` - 胜利配音
8. **修改**: `src/components/DefeatPage.tsx` - 失败配音

---

## 五、预计工作量

- TTS生成: 322个音频文件，约20分钟
- AudioManager开发: 序列播放、异步播放逻辑，约40分钟
- gameStore集成: 出题、回答、事件调用，约40分钟
- 页面集成: 4个页面更新，约15分钟
- 测试调试: 验证所有配音正常，约30分钟

**总计**: 约2.5小时

---

## 六、关键特性

1. **序列播放**：自动播放"正确"/"错误" + 完整式子
2. **异步等待**：支持异步播放游戏开始等关键事件
3. **静音支持**：继承SoundManager的toggleMute
4. **错误处理**：处理音频加载失败、播放中断等情况
5. **教育强化**：每次回答都重复完整式子，强化记忆