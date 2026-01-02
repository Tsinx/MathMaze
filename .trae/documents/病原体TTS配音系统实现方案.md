## 实现计划

### 1. 创建Python批量生成脚本 `scripts/generate_tts.py`
- 使用 `dashscope` SDK 调用 qwen3-tts-flash API
- 为54个病原体的 `intro` 文本生成语音
- 根据病原体特征选择音色：
  - **Level 1-2 (低危险)**: 使用可爱、亲切音色（Cherry、Serena、Chelsie、Momo、Bella）
  - **Level 3 (中等危险)**: 使用活泼、调皮音色（Vivian、Kai、Ryan）
  - **Level 4 (高危险)**: 使用霸气、严肃音色（Katerina、Aiden、Bellona、Vincent）
  - **Level 5 (极高危险)**: 使用阴森、强力音色（Ebona、Lenn、Eldric Sage）
- 音频保存到 `public/audio/intro/[enemy_id].mp3`

### 2. 修改类型定义 `types/index.ts`
- 在 `CombatState` 添加:
  - `isPlayingIntro: boolean` - 是否正在播放介绍
  - `canSkipIntro: boolean` - 是否可以跳过

### 3. 修改游戏状态管理 `store/gameStore.ts`
- `startCombat` 函数添加音频播放逻辑：
  - 设置 `isPlayingIntro: true`
  - 使用 Web Audio API 播放对应敌人的 intro 音频
  - 音频结束后自动进入战斗
- 添加 `skipIntro` 函数：停止音频播放并立即进入战斗

### 4. 修改战斗界面 `components/CombatSystem.tsx`
- 在战斗开始时显示介绍覆盖层：
  - 显示敌人图标和名称
  - 显示"正在播放介绍..."
  - 添加"跳过"按钮
- 音频播放完成后自动隐藏覆盖层

### 5. 安装Python依赖
- 运行 `pip install dashscope`（用户已有Python环境）

### 6. 生成所有音频文件
- 运行 `python scripts/generate_tts.py`
- 脚本会读取 `constants.ts` 中的 PATHOGENS 数据
- 使用环境变量 `DASHSCOPE_API_KEY`
- 自动生成54个音频文件