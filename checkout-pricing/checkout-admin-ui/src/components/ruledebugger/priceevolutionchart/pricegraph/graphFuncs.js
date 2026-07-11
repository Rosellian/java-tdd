import {useTheme} from "../../../../ui/theme/ThemeProvider";

export function DrawGraph({ path }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <polyline
            fill="none"
            stroke={isDark ? "#BB86FC" : "#5A2DA8"}
            strokeWidth="2"
            points={path}
            style={{ transition: "stroke 0.25s ease" }}
        />
    )
}

export function DrawPoint({ i, p, hoverIndex, setHoverIndex }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";
    let hoverFillColor = isDark ? "#4caf50" : "#2e7d32";
    let normalFillColor = isDark ? "#fff" : "#3A1F6B";

    const isHover = hoverIndex === i;

    let fillColor = isHover ? hoverFillColor : normalFillColor;

    return (
        <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={isHover ? 6 : 4}
            fill={fillColor}
            stroke={isDark ? "#333" : "#aaa"}
            strokeWidth="1"
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
            style={{ transition: "all 0.2s ease" }}
        />
    )
}