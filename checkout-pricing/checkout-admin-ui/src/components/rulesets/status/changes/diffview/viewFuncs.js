export function renderEmptyState(isDark) {
    return (
        <div style={isDark ? styles.emptyDark : styles.emptyLight}>
            No changes detected
        </div>
    )
}

export function renderDiffLine(text) {
    const arrowIndex = text.indexOf("→");
    if (arrowIndex === -1) return text;

    const before = text.slice(0, arrowIndex).trim();
    const after = text.slice(arrowIndex + 1).trim();

    return (
        <>
            <span style={styles.before}>{before}</span>
            <span style={styles.arrow}> → </span>
            <span style={styles.after}>{after}</span>
        </>
    )
}

const styles = {
    before: {
        color: "#d9534f",
        fontWeight: "bold"
    },
    arrow: {
        color: "#999"
    },
    after: {
        color: "#5cb85c",
        fontWeight: "bold"
    },
    emptyLight: {
        padding: 10,
        color: "#666",
        fontStyle: "italic"
    },
    emptyDark: {
        padding: 10,
        color: "#aaa",
        fontStyle: "italic"
    }
}