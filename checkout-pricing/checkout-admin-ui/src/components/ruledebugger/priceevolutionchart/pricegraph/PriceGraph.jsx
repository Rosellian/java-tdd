import {useState} from "react";
import {PriceTooltip} from "./PriceTooltip";
import {useTheme} from "../../../../ui/theme/ThemeProvider";
import * as chartOps from "../chartFuncs";
import {DrawGraph, DrawPoint} from "./graphFuncs";

export function PriceGraph({ prices, path, points }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const [hoverIndex, setHoverIndex] = useState(null);

    return (
        <div>
            <svg width={chartOps.width} height={chartOps.height} style={{
                ...styles.svg,
                ...(isDark ? styles.svgDark : styles.svgLight)
            }}>
                <DrawGraph path={path}/>

                {points.map((p, i) =>
                    <DrawPoint key={i} i={i} p={p} hoverIndex={hoverIndex} setHoverIndex={setHoverIndex} />
                )}
            </svg>

            {hoverIndex !== null && (
                <PriceTooltip prices={prices} hoverIndex={hoverIndex}/>
            )}
        </div>
    )
}

const styles = {
    svg: {
        borderRadius: 6,
        border: "1px solid",
        transition: "background 0.25s ease, border-color 0.25s ease"
    },
    svgDark: {
        background: "#111",
        borderColor: "#333"
    },
    svgLight: {
        background: "#fafafa",
        borderColor: "#ccc"
    }
}