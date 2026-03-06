export function detectActiveFrame(rolls) {
    let i = 0;
    for (let frame = 0; frame < 9; frame++) {
        if (rolls[i] === undefined) return frame;
        // Strike -> frame complete
        if (rolls[i] === 10) {
            i += 1;
        }
        else {
            // Second roll missing -> frame active
            if (rolls[i+1] === undefined) return frame;
            i += 2;
        }
        // Not enough rolls to fill frame
        if (i > rolls.length - 1) return frame;
    }
    return 9;// Frame 10
}

export function detectActiveRoll(rolls) {
    let i = 0;
    for (let frame = 0; frame < 9; frame++) {
        // First roll missing
        if (rolls[i] === undefined) return 1;
        // Strike -> next frame
        if (rolls[i] === 10) {
            if (rolls.length === i+1) return 1;// First roll in next frame
            i+=1;
            continue;
        }
        // Second roll missing
        if (rolls[i+1] === undefined) return 2;
        // Frame complete -> next frame, roll 1
        i+=2;
        if (i > rolls.length - 1) return 1;
    }

    // Frame 10
    const r1 = rolls[i];
    const r2 = rolls[i+1];
    if (r1 === undefined) return 1;
    if (r2 === undefined) return 2;
    return 3;
}