export function isChanged(rule, originalRule, field) {
    if(!originalRule) return false;

    return rule[field] !== originalRule[field];
}

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