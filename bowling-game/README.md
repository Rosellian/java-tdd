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
   A Game class with methods `roll(int pins)` and `score()`.
2. **All simple hits → sum**
   - Store all throws in an array/list
   - calculate the sum in score()
3. **Spares → bonus**
   - Identify spare: two throws in same frame which together adds to 10.
   - Add bonus: next throw after spare.
   - Continue counting frames correctly.
4. **Strikes → bonus**
   - Identify strike: one throw of 10 at the start of a frame.
   - Skip the second throw of the frame.
   - Add bonus: the next two throws.
   - Continue counting frames correctly.
5. **Perfect game → 30**
