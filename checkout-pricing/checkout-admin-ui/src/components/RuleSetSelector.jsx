export function RuleSetSelector({ value, onChange }) {
    return (
        <div style={styles.box}>
            <h3 style={styles.title}>Rule Set</h3>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={styles.select}
            >
                <option value="default">Default</option>
                <option value="campaignA">Campaign A</option>
                <option value="campaignB">Campaign B</option>
            </select>
        </div>
    );
}

const styles = {
    box: {
        background: "#1E1E1E",
        padding: 15,
        borderRadius: 4,
    },
    title: {
        color: "#82B1FF",
        marginBottom: 10,
    },
    select: {
        background: "#2A2A2A",
        border: "1px solid #333",
        color: "#E0E0E0",
        padding: 5,
        width: "100%",
    }
}