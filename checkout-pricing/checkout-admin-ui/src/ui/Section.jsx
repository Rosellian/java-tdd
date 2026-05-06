export function Section({ title, children }) {
    return (
        <div style={styles.section}>
            <h2 style={styles.sectionHeader}>{title}</h2>
            {children}
        </div>
    );
}

const styles = {
    section: {
        marginBottom: 40,
    },
    sectionHeader: {
        borderBottom: "1px solid #333",
        paddingBottom: 5,
        marginBottom: 15,
        color: "#BB86FC",
    }
}