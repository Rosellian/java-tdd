import {useTheme} from "../../../../../ui/theme/ThemeProvider";

export function StatusMark({ matched }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";
    let color = getMatchedColor(matched, isDark);

    return (
        <span style={{
            ...styles.matched,
            color
        }}>
            {matched ? "✔ Applied" : "✖ Skipped"}
        </span>
    )
}

function getMatchedColor(matched, isDark) {
    return matched ?
        isDark ? "#7CFC7C" : "#2e7d32"
        : isDark ? "#FF6B6B" : "#d32f2f";
}

const styles = {
    matched: {
        fontWeight: 500,
        transition: "color 0.25s ease"
    }
}