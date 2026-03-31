import {useState} from "react";
import {PriceTooltip} from "./PriceTooltip";

const width = 500;
const height = 200;

export function PriceGraph({ prices, path, points }) {
    const [hoverIndex, setHoverIndex] = useState(null);

    return (
        <div>
            <svg width={width} height={height} style={styles.svg}>
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
    return (
        <polyline
            fill="none"
            stroke="#BB86FC"
            strokeWidth="2"
            points={path}
        />
    )
}

function DrawPoint({ i, p, hoverIndex, setHoverIndex }) {
    return (
        <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={hoverIndex === i ? 6 : 4}
            fill={hoverIndex === i ? "#4caf50" : "#fff"}
            stroke="#333"
            strokeWidth="1"
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
        />
    )
}

const styles = {
    svg: {
        background: "#111",
        borderRadius: 6,
        border: "1px solid #333",
    }
}