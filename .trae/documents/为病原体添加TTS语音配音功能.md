# TTS语音配音功能实现方案

## 一、技术方案概述
使用阿里云Qwen3-TTS-Flash API，为54个病原体的自我介绍生成音频，在战斗开始时播放，播放完成后进入回合制战斗。

## 二、音色选择策略（根据病原体等级和特征）

| 危险等级 | 推荐音色 | 特点 |
|---------|---------|------|
| Level 1 (可爱型) | Cherry、茉兔、萌小姬、小野杏 | 甜美可爱，适合低龄儿童 |
| Level 2 (友好型) | Serena、Jada、Sunny | 温和友善 |
| Level 3 (中性型) | Ethan、Dylan、Toby | 中性稳重 |
| Level 4 (危险型) | 沧明子、墨讲师 | 成熟严肃，带威胁感 |
| Level 5 (BOSS型) | 十三、女汉子风格音色 | 强势霸气 |

## 三、实现步骤

### 步骤1：创建Python脚本批量生成TTS音频
- 创建 `scripts/generate_tts.py`
- 读取 `src/utils/constants.ts` 中的54个病原体数据
- 使用环境变量 `DASHSCOPE_API_KEY`
- 根据危险等级分配音色
- 调用 `qwen3-tts-flash` API生成音频
- 保存到 `public/audio/enemies/{enemy_id}.mp3`

### 步骤2：扩展Enemy类型
- 在 `src/types/index.ts` 的 `Enemy` 接口中添加 `voiceFile?: string` 字段
- 在 `src/utils/constants.ts` 中为每个病原体设置 `voiceFile` 路径

### 步骤3：扩展CombatState
- 在 `src/types/index.ts` 中添加新状态：
  - `introPhase: 'playing' | 'finished' | 'skipped'`
  - `canSkipIntro: boolean`

### 步骤4：创建IntroPlayer组件
- 新建 `src/components/IntroPlayer.tsx`
- 显示敌人头像和名字
- 播放TTS音频
- 显示"跳过"按钮
- 音频播放完成后自动进入战斗

### 步骤5：修改CombatSystem
- 在战斗开始前先显示 `IntroPlayer`
- 只有在intro播放完成或跳过后才显示战斗界面
- 集成现有的战斗逻辑

### 步骤6：修改gameStore
- 在 `startCombat` 中设置 `introPhase: 'playing'`
- 添加 `skipIntro` action
- 音频播放完成后调用 `startBattle`（原有战斗逻辑）

### 步骤7：运行生成脚本
- 执行 `python scripts/generate_tts.py` 批量生成54个音频文件
- 音频文件存入 `public/audio/enemies/` 目录

## 四、文件清单

### 新建文件：
1. `scripts/generate_tts.py` - TTS音频批量生成脚本
2. `src/components/IntroPlayer.tsx` - 介绍播放UI组件
3. `public/audio/enemies/.gitkeep` - 音频目录

### 修改文件：
1. `src/types/index.ts` - 扩展Enemy和CombatState
2. `src/utils/constants.ts` - 为每个病原体添加voiceFile和voiceName
3. `src/store/gameStore.ts` - 添加introPhase状态和skipIntro action
4. `src/components/CombatSystem.tsx` - 集成IntroPlayer

## 五、Python依赖
需要安装：`pip install dashscope requests`

## 六、注意事项
- 音频文件约2-5秒/个，54个文件约200MB
- 首次运行需要联网调用API
- API调用有配额限制，建议分批生成