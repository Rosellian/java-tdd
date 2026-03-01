# String Calculator TDD
Classic exercise in java using test-driven development.

## Steps
### Main workflow
1. First write the **test** and run it (red).
2. **Implement** minimal code needed (green).
3. **Refactor** the code to improve it without braking any test.
### Rules
- Write test for expected new behavior first.
- Implement without braking other tests.
- Tests make sure code changes and refactoring maintain functionality.
### 1. Empty string returns 0
Input: "" → Output: 0
### 2. Single number
Input: "5" → Output: 5
### 3. Two comma-separated numbers
Input: "1,2" → Output: 3
### 4. Arbitrary list of numbers
Input: "1,2,3,4" → Output: 10
### 5. Handle newline as separator
Input: "1\n2,3" → Output: 6
### 6. Custom delimiter
- Format: "//;\n1;2" → Output: 3
- First row defines a new separator
### 7. Negative numbers throw exception
- Input: "1,-2,3" → throws IllegalArgumentException
- Message shall include all negative numbers: "Negatives not allowed: -2"
### 8. Ignore numbers larger than 1000
Input: "2,1001" → Output: 2
### 9. Support of delimiters of arbitrary length
Input: "//[+++]\n1+++2+++3" → Output: 6
### 10. Multiple delimiters
Input: "//[*][%]\n1*2%3" → Output: 6