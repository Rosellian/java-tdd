// buildFrames.js

export function buildFrames(rolls) {
    if (!Array.isArray(rolls)) rolls = [];

    const safe = (x) => (typeof x === "number" ? x : 0);

    const frames = [];
    let i = 0;
    let runningTotal = 0;

    for (let frame = 0; frame < 10; frame++) {
        const r1 = rolls[i];
        const r2 = rolls[i + 1];
        const r3 = rolls[i + 2];

        const f = { r1: "", r2: "", r3: "", total: "" };

        // ---------------------------
        // Frames 1–9
        // ---------------------------
        if (frame < 9) {
            // Strike
            if (r1 === 10) {
                f.r1 = "X";

                if (rolls[i + 1] !== undefined && rolls[i + 2] !== undefined) {
                    runningTotal += 10 + safe(rolls[i + 1]) + safe(rolls[i + 2]);
                    f.total = runningTotal;
                }

                i += 1;
            }

            // Spare
            else if (r1 !== undefined && r2 !== undefined && r1 + r2 === 10) {
                f.r1 = r1 === 0 ? "-" : r1;
                f.r2 = "/";

                if (rolls[i + 2] !== undefined) {
                    runningTotal += 10 + safe(rolls[i + 2]);
                    f.total = runningTotal;
                }

                i += 2;
            }

            // Open frame
            else if (r1 !== undefined && r2 !== undefined) {
                f.r1 = r1 === 0 ? "-" : r1;
                f.r2 = r2 === 0 ? "-" : r2;

                runningTotal += safe(r1) + safe(r2);
                f.total = runningTotal;

                i += 2;
            }

            // Empty frame
            else {
                if (r1 !== undefined) f.r1 = r1 === 0 ? "-" : r1;
                if (r2 !== undefined) f.r2 = r2 === 0 ? "-" : r2;
                i += 2;
            }
        }

            // ---------------------------
            // Frame 10
            // ---------------------------
        else {
            // Throw 1
            if (r1 !== undefined) {
                f.r1 = r1 === 10 ? "X" : r1 === 0 ? "-" : r1;
            }

            // Throw 2
            if (r2 !== undefined) {
                if (r1 === 10) {
                    f.r2 = r2 === 10 ? "X" : r2 === 0 ? "-" : r2;
                } else if (r1 + r2 === 10) {
                    f.r2 = "/";
                } else {
                    f.r2 = r2 === 0 ? "-" : r2;
                }
            }

            // Throw 3
            if (r3 !== undefined) {
                f.r3 = r3 === 10 ? "X" : r3 === 0 ? "-" : r3;
            }

            // Total score shown when all throws exist
            if (r1 !== undefined && r2 !== undefined) {
                if (r1 === 10 || r1 + r2 === 10) {
                    if (r3 !== undefined) {
                        runningTotal = rolls.reduce((a, b) => a + b, 0);
                        f.total = runningTotal;
                    }
                } else {
                    runningTotal = rolls.reduce((a, b) => a + b, 0);
                    f.total = runningTotal;
                }
            }
        }

        frames.push(f);
    }

    return frames;
}