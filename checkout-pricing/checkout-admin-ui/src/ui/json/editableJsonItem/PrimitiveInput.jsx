import {useTheme} from "../../theme/ThemeProvider";

export function PrimitiveInput({ value, onChange, changed }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";
    let changedColor = changed ? "#FFB300" : undefined;

    return (
        <input value={value} onChange={onChange}
               style={{
                   ...styles.input,
                   ...(isDark ? styles.inputDark : styles.inputLight),
                   borderColor: changedColor
        }}/>
    )
}

const styles = {
    input: {
        width: "100%",
        padding: "6px 8px",
        borderRadius: 4,
        border: "1px solid",
        fontSize: "0.9rem"
    },
    inputDark: {
        background: "#2A2A2A",
        color: "#eee",
        borderColor: "#444"
    },
    inputLight: {
        background: "#ffffff",
        color: "#222",
        borderColor: "#ccc"
    }
}