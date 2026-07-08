import {useTheme} from "../../../../../ui/theme/ThemeProvider";

export function InputField({ type, placeholder, value, onChange, width, isChanged = false }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    let border = getBorderColor(isDark, isChanged);

    return (
        <input name={`${placeholder}Input`} type={type} placeholder={placeholder} value={value} onChange={onChange}
               style={{
                   ...styles.input,
                   ...(isDark ? styles.inputDark : styles.inputLight),
                   ...({
                       borderTop: border,
                       borderRight: border,
                       borderBottom: border,
                       borderLeft: border
                   }),
                   width: width ?? 150
        }}/>
    )
}

function getBorderColor(isDark, isChanged) {
    let baseBorder = isDark ? "1px solid #333" : "1px solid #ccc";
    let changedBorder = "2px solid #FFB300"

    return isChanged ? changedBorder : baseBorder;
}

const styles = {
    input: {
        padding: 6,
        borderRadius: 4,
        transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease"
    },
    inputDark: {
        background: "#2A2A2A",
        color: "#E0E0E0"
    },
    inputLight: {
        background: "#ffffff",
        color: "#000000"
    }
}