import {useTheme} from "../../../../ui/ThemeProvider";

export function DrawGraph({ path }) {
    const { theme } = useTheme();

    return (
        <polyline
            fill="none"
            stroke={theme === "dark" ? "#BB86FC" : "#5A2DA8"}
            strokeWidth="2"
            points={path}
            style={{ transition: "stroke 0.25s ease" }}
        />
    )
}

export function DrawPoint({ i, p, hoverIndex, setHoverIndex }) {
    const { theme } = useTheme();
    const isHover = hoverIndex === i;

    return (
        <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={isHover ? 6 : 4}
            fill={isHover ?
                theme === "dark" ? "#4caf50" : "#2e7d32"
                : theme === "dark" ? "#fff" : "#3A1F6B"}
            stroke={theme === "dark" ? "#333" : "#aaa"}
            strokeWidth="1"
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
            style={{ transition: "all 0.2s ease" }}
        />
    )
}