I have identified the issues causing the animation bugs and will fix them by strictly enforcing the state machine logic in `CombatSystem.tsx` and `gameStore.ts`.

### 1. Fix Logic in `CombatSystem.tsx`
- **Issue**: The `enemyVariant` logic for `attacking` status is inverted or missing correct phase checks.
- **Fix**: Rewrite the variant assignment logic to explicitly handle all 4 scenarios:
    - **Player Attacking**: Player moves Right (+x), Enemy Idle.
    - **Enemy Attacking**: Enemy moves Left (-x), Player Idle.
    - **Player Hit**: Player Shakes, Enemy Idle.
    - **Enemy Hit**: Enemy Shakes, Player Idle.
    - **Blocked**: Defender shows Shield, Attacker Idle.
- **Reset Animation**: Ensure that when status returns to `idle`, both characters return to `x: 0`.

### 2. Fix State Machine in `gameStore.ts`
- **Issue**: The current timeout logic might be setting `idle` too quickly or overlapping states, preventing the "return to position" animation from playing.
- **Fix**:
    - Ensure `animationStatus` is reset to `'idle'` explicitly *after* the hit/block animation completes but *before* the next turn starts.
    - Add a distinct `return` phase if necessary, or rely on the `idle` state to trigger the spring animation back to `x:0`.

### 3. Verify Enemy Attack Animation
- **Issue**: "Enemy has no attack animation".
- **Fix**: In `CombatSystem.tsx`, ensure `enemyVariant` correctly sets `x: -150` when `animationStatus === 'attacking'` and `phase === 'defense'`.

### 4. Implementation Plan
1.  **Modify `CombatSystem.tsx`**:
    - Refactor the big `if-else` block for variants into a clear, exhaustive logic structure based on `phase` + `animationStatus`.
    - Explicitly define the "Return" behavior (Spring back to 0 when idle).
2.  **Modify `gameStore.ts`**:
    - Tune the `setTimeout` delays to allow the "Return" animation to be seen before the next question pops up.
    - Ensure `animationStatus` goes `attacking` -> `hit/blocked` -> `idle`.

### 5. Verification
- **Test Case 1 (Player Attack)**:
    - Player lunges right -> Enemy shakes (if hit) / shields (if blocked) -> Player moves back to left.
- **Test Case 2 (Enemy Attack)**:
    - Enemy lunges left -> Player shields (if correct) / shakes (if wrong) -> Enemy moves back to right.