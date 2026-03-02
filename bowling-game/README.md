# Bowling Game kata
Count points in bowling.

## TDD
### Main workflow
1. First write the **test** and run it (red).
2. **Implement** minimal code needed (green).
3. **Refactor** the code to improve it without braking any test.
### Rules
- Write test for expected new behavior first.
- Implement without braking other tests.
- Tests make sure code changes and refactoring maintain functionality.

## Steps
### Game Rules
A bowling game consists of 10 frames. Every frame has 2 throws, except strike‑frames.

Bonus rules:
- Spare: 10 points + next throw.
- Strike: 10 points + next two throws.
- 10th frame: special case with extra throw.

### Iterations
1. **All misses → 0**  
   First step is to create:
   A Game class with methods `roll(int pins)` and `score()`
2. **All simple hits → sum**

3. **Spares → bonus**

4. **Strikes → bonus**

5. **Perfect game → 30**
