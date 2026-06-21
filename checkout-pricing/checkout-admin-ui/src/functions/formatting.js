export function formatChosen(chosen) {
    const lineWrapRe = /\s*\+\s*/g;

    return chosen.replace(lineWrapRe, " +\n");
}