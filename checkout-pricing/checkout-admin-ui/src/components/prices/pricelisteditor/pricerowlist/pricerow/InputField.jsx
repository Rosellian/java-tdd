import {useTheme} from "../../../../../ui/theme/ThemeProvider";

export function InputField({ type, placeholder, value, onChange, width }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <input type={type} placeholder={placeholder} value={value} onChange={onChange}
               style={{
                   ...styles.input,
                   ...(isDark ? styles.inputDark : styles.inputLight),
                   width: width ?? 150
        }}/>
    )
}

const styles = {
    input: {
        padding: 6,
        borderRadius: 4,
        border: "1px solid",
        transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease"
    },
    inputDark: {
        background: "#2A2A2A",
        borderColor: "#333",
        color: "#E0E0E0"
    },
    inputLight: {
        background: "#ffffff",
        borderColor: "#ccc",
        color: "#000000"
    }
}