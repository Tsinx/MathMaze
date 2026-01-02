I will upgrade the combat system with a dedicated animation state machine, enhanced visual effects, and new synthesized sound effects.

### 1. Update Type Definitions
- **File**: `src/types/index.ts`
- **Action**: Extend `CombatState` interface.
    - Add `animationStatus`: `'idle' | 'attacking' | 'hit' | 'blocked'` to explicitly control visual states.
    - Add `isInputLocked`: `boolean` to prevent player input during animations.

### 2. Enhance Sound Manager
- **File**: `src/utils/SoundManager.ts`
- **Action**: Implement new synthesized sound effects using Web Audio API.
    - `playBlock()`: A metallic "clang" sound using high-frequency triangle/sine waves with rapid decay.
    - `playCatch()`: A cheerful "Pokemon-style" collection jingle (rapid ascending arpeggio) for successful hits/victories.
    - Enhance `playAttack()` to be more punchy.

### 3. Refactor Combat Logic (State Machine)
- **File**: `src/store/gameStore.ts`
- **Action**: Rewrite `answerQuestion` to follow a strict timed sequence:
    1.  **Lock Input**: Immediately disable controls.
    2.  **Attack Phase**: Set status to `attacking`, trigger "Lunge" animation and attack sound.
    3.  **Impact Phase** (after ~500ms):
        - **If Hit**: Set status to `hit`, apply damage, play `playCatch` (success) or `playDamage`.
        - **If Blocked/Miss**: Set status to `blocked`, play `playBlock` sound.
    4.  **Resolution Phase** (after ~1000ms): Reset status to `idle`, unlock input, and switch turns (Player <-> Enemy).

### 4. Upgrade Visuals & Animations
- **File**: `src/components/CombatSystem.tsx`
- **Action**:
    - **Intense Animations**: Increase `x` translation (to reach "face-to-face") and `scale` (1.5x) for attacks.
    - **Reactive States**:
        - **Blocked**: Show a shield effect or "Clang" visual when an attack fails.
        - **Hit**: Add screen shake or flash effect.
    - **Input Locking**: Disable the answer buttons when `isInputLocked` is true.

### 5. Verification
- **Test**: Play through a combat encounter.
- **Verify**:
    - Buttons are unclickable during attack animations.
    - Attack animation moves character all the way to the target.
    - Correct sounds play for Hit vs. Blocked.
    - Animation stops precisely when the next turn begins.