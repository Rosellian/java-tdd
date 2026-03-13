import styles from "./Styles";

export function Section({ title, children }) {
    return (
        <div style={styles.section}>
            <h2 style={styles.sectionHeader}>{title}</h2>
            {children}
        </div>
    );
}