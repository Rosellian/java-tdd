export function renderEmptyState(isDark) {
    return (
        <div style={{
            ...styles.timelineEmpty,
            ...(isDark ? styles.emptyDark : styles.emptyLight)
        }}>
            No rules matched in this step.
        </div>
    )
}

const styles = {
    timelineEmpty: {
        padding: 16,
        borderRadius: 8,
        fontStyle: "italic",
        transition: "background 0.25s ease, color 0.25s ease"
    },
    emptyDark: {
        background: "#1a1a1a",
        color: "#777"
    },
    emptyLight: {
        background: "#fafafa",
        color: "#666"
    }
}