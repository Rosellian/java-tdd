export function lineWrapOnPlus(chosen) {
    const lineWrapRe = /\s*\+\s*/g;

    return chosen.replace(lineWrapRe, " +\n");
}