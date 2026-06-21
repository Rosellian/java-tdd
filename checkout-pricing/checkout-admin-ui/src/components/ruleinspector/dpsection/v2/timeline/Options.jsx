export function Options({ options, isDark }) {
    return (
        <div style={styles.container}>
            <span>Options:</span>

            <div style={styles.options}>
                {(options?.length ? options : ["None"]).map((opt, j) => (
                    <span key={j} style={{
                        ...styles.option,
                        ...(isDark ? styles.optionDark : styles.optionLight)
                    }}>
                        {opt}
                    </span>
                ))}
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: "flex",
        flexWrap: "wrap",
        gap: 5,
    },
    options: {
        display: "flex",
        flexWrap: "wrap",
        gap: 5
    },
    option: {
        padding: "2px 6px",
        borderRadius: 4,
        fontSize: "0.75rem",
        border: "1px solid"
    },
    optionDark: {
        background: "#1E1E1E",
        borderColor: "#333",
        color: "#ccc"
    },
    optionLight: {
        background: "#f5f5f5",
        borderColor: "#ccc",
        color: "#333"
    }
}