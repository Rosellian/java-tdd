import {useTheme} from "../../../ui/ThemeProvider";

export function DPDetails({ node, index }) {
    const { theme } = useTheme();

    return (
        <div style={{
            ...styles.dpDetails,
            ...(theme === "dark" ? styles.detailsDark : styles.detailsLight)
        }}>
            <h4 style={{
                ...styles.dpDetailsHeader,
                ...(theme === "dark" ? styles.headerDark : styles.headerLight)
            }}>
                Step {index + 1}
            </h4>

            <DPDetail label={"State"} value={node.state} />
            <DPDetail label={"Chosen"} value={node.chosen} />
            <DPDetail label={"Price"} value={node.price} />
            <DPOptions node={node} />
        </div>
    );
}

function DPDetail({ label, value }) {
    const { theme } = useTheme();

    return (
        <div style={styles.dpDetailsRow}>
            <span style={{
                ...styles.dpLabel,
                ...(theme === "dark" ? styles.labelDark : styles.labelLight)
            }}>{label}:</span>
            <span style={{
                ...styles.dpValue,
                ...(theme === "dark" ? styles.valueDark : styles.valueLight)
            }}>{value}</span>
        </div>
    )
}

function DPOptions({ node }) {
    const { theme } = useTheme();

    return (
        <div style={styles.dpDetailsRow}>
            <span style={{
                ...styles.dpLabel,
                ...(theme === "dark" ? styles.labelDark : styles.labelLight)
            }}>Options:</span>
            <span style={{
                ...styles.dpValueList,
                ...(theme === "dark" ? styles.listDark : styles.listLight)
            }}>
                    {node.options && node.options.length > 0
                        ? node.options.join(", ")
                        : "None"}
            </span>
        </div>
    )
}

const styles = {
    dpDetails: {
        padding: 12,
        borderRadius: 6,
        border: "1px solid",
        transition: "background 0.25s ease, color 0.25s ease, border-color 0.25s ease",
    },
    detailsDark: {
        background: "#111",
        borderColor: "#333",
        color: "#eee",
    },
    detailsLight: {
        background: "#fff",
        borderColor: "#ccc",
        color: "#222",
    },
    dpDetailsHeader: {
        marginBottom: 8,
        fontSize: "1rem",
        fontWeight: 600,
        transition: "color 0.25s ease",
    },
    headerDark: {
        color: "#BB86FC",
    },
    headerLight: {
        color: "#5A2DA8",
    },
    dpDetailsRow: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    dpLabel: {
        fontWeight: 500,
        transition: "color 0.25s ease",
    },
    labelDark: {
        color: "#bbb",
    },
    labelLight: {
        color: "#555",
    },
    dpValue: {
        fontWeight: 600,
        transition: "color 0.25s ease",
    },
    valueDark: {
        color: "#4caf50",
    },
    valueLight: {
        color: "#2e7d32",
    },
    dpValueList: {
        fontStyle: "italic",
        transition: "color 0.25s ease",
    },
    listDark: {
        color: "#ccc",
    },
    listLight: {
        color: "#444",
    }
}