import {useTheme} from "../../../../ui/theme/ThemeProvider";

export function PriceListDropdown({ value, onChange, names, isDraft }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    let label = "PriceListSelection";

    return (
        <select title={label} name={label} value={value}
                onChange={(e) => onChange(e.target.value)}
            style={{
                ...styles.select,
                ...(isDark ? styles.selectDark : styles.selectLight)
        }}>
            {names.map(name => (
                <option key={name} value={name}>
                    {isDraft && name === value ? `${name} (unsaved)` : name}
                </option>
            ))}
        </select>
    )
}

const styles = {
    select: {
        border: "1px solid",
        padding: 5,
        width: "auto",
        transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease"
    },
    selectDark: {
        background: "#2A2A2A",
        borderColor: "#333",
        color: "#E0E0E0"
    },
    selectLight: {
        background: "#ffffff",
        borderColor: "#ccc",
        color: "#000000"
    }
}