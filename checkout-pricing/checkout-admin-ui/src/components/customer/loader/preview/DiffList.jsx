export function DiffList({ changes, isDark }) {
    return (
        <div style={styles.diffList}>
            {changes.map((c, i) => (
                <div key={i} style={{
                    ...styles.diffItem,
                    ...(isDark ? styles.diffItemDark : styles.diffItemLight)
                }}>
                    <div style={styles.diffPath}>
                        {c.path.join(" → ")}
                    </div>

                    <div style={styles.diffRow}>
                        <span style={styles.label}>Now:</span>
                        <span style={styles.valueRemoved}>
                                {JSON.stringify(c.from)}
                            </span>
                    </div>

                    <div style={styles.diffRow}>
                        <span style={styles.label}>Imported as:</span>
                        <span style={styles.valueAdded}>
                                {JSON.stringify(c.to)}
                            </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

const styles = {
    diffList: {
        maxHeight: 250,
        overflowY: "auto",
        paddingRight: 6,
        display: "flex",
        flexDirection: "column",
        gap: 8
    },
    diffItem: {
        padding: 8,
        borderRadius: 4,
        border: "1px solid",
        fontSize: "0.85rem"
    },
    diffItemDark: {
        background: "#1A1A1A",
        borderColor: "#333"
    },
    diffItemLight: {
        background: "#fafafa",
        borderColor: "#ccc"
    },
    diffPath: {
        fontWeight: 600,
        marginBottom: 4
    },
    diffRow: {
        display: "flex",
        gap: 6,
        marginBottom: 2
    },
    label: {
        opacity: 0.7
    },
    valueRemoved: {
        color: "#d32f2f",
        fontWeight: 600
    },
    valueAdded: {
        color: "#4caf50",
        fontWeight: 600
    }
}