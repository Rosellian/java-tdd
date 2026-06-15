import {useTheme} from "../../../../ui/theme/ThemeProvider";

export function RuleItem({ i, rule, isSelected, onSelect }) {
    const { theme } = useTheme();

    return (
        <div key={i} onClick={() => onSelect(i)} style={{
            ...styles.item,
            ...(i === isSelected
                ? (theme === "dark" ? styles.itemSelectedDark : styles.itemSelectedLight)
                : theme === "dark" ? styles.itemDark : styles.itemLight)
        }}>{rule.name}</div>
    )
}

const styles = {
    item: {
        padding: "6px 10px",
        borderRadius: 4,
        cursor: "pointer",
        transition: "background 0.2s ease, color 0.2s ease",
    },
    itemDark: {
        background: "#2A2A2A",
        color: "#E0E0E0",
    },
    itemLight: {
        background: "#F0F0F0",
        color: "#333",
    },
    itemSelectedDark: {
        background: "#BB86FC",
        color: "#fff",
    },
    itemSelectedLight: {
        background: "#D9C4FF",
        color: "#3A1F6B",
    }
}