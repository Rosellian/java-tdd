export function ButtonPanel({ children }) {
    return (
        <div style={styles.buttonPanel}>
            {children}
        </div>
    )
}

const styles = {
    buttonPanel: {
        display: "flex",
        flexDirection: "column",
        gap: 15
    }
}