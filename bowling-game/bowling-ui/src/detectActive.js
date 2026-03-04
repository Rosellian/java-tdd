export function detectActiveFrame(rolls) {
    let i = 0;
    for (let frame = 0; frame < 9; frame++) {
        // Strike -> frame complete
        if (rolls[i] === 10) {
            i += 1;
        }
        else {
            // Otherwise two rolls
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
        // Strike -> next frame
        if (rolls[i] === 10) {
            if (rolls.length === i+1) return 1;// First roll in next frame
            i+=1;
        }
        else {
            if (rolls.length === i) return 1;// First roll
            if (rolls.length === i+1) return 2;// Second roll
            i+=2;
        }
    }

    // Frame 10
    const r1 = rolls[i];
    const r2 = rolls[i+1];
    if (r1 === undefined) return 1;
    if (r2 === undefined) return 2;
    return 3;
}