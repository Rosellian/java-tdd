import {useTheme} from "../../../../../ui/ThemeProvider";

export function InputField({ type, placeholder, value, onChange }) {
    const { theme } = useTheme();

    return (
        <input type={type} placeholder={placeholder} value={value} onChange={onChange}
               style={{
                   ...styles.input,
                   ...(theme === "dark" ? styles.inputDark : styles.inputLight)
               }}
        />
    )
}

const styles = {
    input: {
        width: "100px",
        padding: 6,
        borderRadius: 4,
        border: "1px solid",
        flex: 1,
        transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
    },
    inputDark: {
        background: "#2A2A2A",
        borderColor: "#333",
        color: "#E0E0E0",
    },
    inputLight: {
        background: "#ffffff",
        borderColor: "#ccc",
        color: "#000000",
    }
}