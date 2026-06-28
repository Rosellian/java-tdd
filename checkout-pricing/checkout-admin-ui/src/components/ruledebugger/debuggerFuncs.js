export function renderEmptyState(isDark) {
    return (
        <div style={{
            ...debuggerStyles.container,
            ...(isDark ? debuggerStyles.dark : debuggerStyles.light)
        }}>
            <p>No trace available. Run a pricing evaluation.</p>
        </div>
    )
}

export const debuggerStyles = {
    container: {
        padding: 16,
        borderRadius: 8,
        transition: "background 0.3s ease, color 0.3s ease"
    },
    dark: {
        background: "#1a1a1a",
        color: "#eee"
    },
    light: {
        background: "#f5f5f5",
        color: "#000"
    }
}