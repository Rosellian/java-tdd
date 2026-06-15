import {useTheme} from "../../../../../ui/theme/ThemeProvider";

export function StatusMark({ matched }) {
    const { theme } = useTheme();

    const color = matched ?
        theme === "dark" ? "#7CFC7C" : "#2e7d32"
        : theme === "dark" ? "#FF6B6B" : "#d32f2f";

    return (
        <span style={{
            ...styles.matched,
            color
        }}>{matched ? "✔ Applied" : "✖ Skipped"}</span>
    )
}

const styles = {
    matched: {
        fontWeight: 500,
        transition: "color 0.25s ease",
    }
}