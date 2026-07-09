export function getBorder(isDark, changed) {
    let baseColor = "1px solid #444";
    let changedColor = changed ? "2px solid #FFB300" : baseColor;

    return {
        borderTop: changedColor,
        borderRight: changedColor,
        borderBottom: changedColor,
        borderLeft: changedColor
    }
}