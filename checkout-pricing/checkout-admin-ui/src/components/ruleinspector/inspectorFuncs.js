export function renderEmptyState(isDark) {
    return (
        <div style={{
            ...inspectorStyles.container,
            ...(isDark ? inspectorStyles.dark : inspectorStyles.light)
        }}>
            <p>No trace available. Run a pricing evaluation.</p>
        </div>
    )
}

export const inspectorStyles = {
    container: {
        fontFamily: "monospace",
        padding: 20,
        margin: "0 auto",
        transition: "background 0.3s ease, color 0.3s ease"
    },
    dark: {
        background: "#121212",
        color: "#E0E0E0"
    },
    light: {
        background: "#ffffff",
        color: "#000000"
    }
}