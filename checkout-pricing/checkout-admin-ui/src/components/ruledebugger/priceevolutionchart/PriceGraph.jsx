import {useState} from "react";
import {PriceTooltip} from "./PriceTooltip";
import {useTheme} from "../../../ui/ThemeProvider";

const width = 500;
const height = 200;

export function PriceGraph({ prices, path, points }) {
    const { theme } = useTheme();
    const [hoverIndex, setHoverIndex] = useState(null);

    return (
        <div>
            <svg width={width} height={height} style={{
                ...styles.svg,
                ...(theme === "dark" ? styles.svgDark : styles.svgLight)
            }}>
                <DrawGraph path={path}/>

                {points.map((p, i) =>
                    <DrawPoint i={i} p={p} hoverIndex={hoverIndex} setHoverIndex={setHoverIndex} />
                )}
            </svg>

            {hoverIndex !== null && <PriceTooltip prices={prices} hoverIndex={hoverIndex}/>}
        </div>
    )
}

function DrawGraph({ path }) {
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

function DrawPoint({ i, p, hoverIndex, setHoverIndex }) {
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

const styles = {
    svg: {
        borderRadius: 6,
        border: "1px solid",
        transition: "background 0.25s ease, border-color 0.25s ease",
    },
    svgDark: {
        background: "#111",
        borderColor: "#333",
    },
    svgLight: {
        background: "#fafafa",
        borderColor: "#ccc",
    }
}