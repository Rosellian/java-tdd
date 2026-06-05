import {useTheme} from "../../../../ui/ThemeProvider";

export function RuleItem({ i, rule, isSelected, onSelect }) {
    const { theme } = useTheme();

    return (
        <div key={i} onClick={() => onSelect(i)} style={{
            ...styles.item,
            ...(i === isSelected
                ? (theme === "dark" ? styles.itemSelectedDark : styles.itemSelectedLight)
                : {})
        }}>
            {rule.name}
        </div>
    )
}

const styles = {
    item: {
        padding: "6px 10px",
        borderRadius: 4,
        cursor: "pointer",
        background: "#333",
        color: "#eee",
    },
    itemSelectedDark: {
        background: "#BB86FC",
        color: "#fff",
    },
    itemSelectedLight: {
        background: "#5A2DA8",
        color: "#000",
    }
}