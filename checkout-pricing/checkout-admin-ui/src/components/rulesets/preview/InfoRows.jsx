export function InfoRows({ rules }) {
    let total = rules.length;
    let types = [...new Set(rules.map(r => r.type))];

    return (
        <div style={styles.rows}>
            <div style={styles.row}>
                <span>Total rules:</span>
                <strong>{total}</strong>
            </div>

            <div style={styles.row}>
                <span>Types:</span>
                <strong>{types.join(", ")}</strong>
            </div>
        </div>
    )
}

const styles = {
    rows: {
        background: "rgba(187,134,252,0.15)",
        padding: 4,
        borderRadius: 6
    },
    row: {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        padding: 4,
        columnGap: 12,
        fontSize: 14
    }
}