import {buildFrames} from "./buildFrames";

export default function Scoreboard({ rolls }) {
    const frames = buildFrames(rolls);

    return (
        <div style={{ display: "flex", gap: 8 }}>
            {frames.map((f, i) => (
                <div key={i} style={{
                    border: "1px solid black",
                    padding: 8,
                    width: 60,
                    textAlign: "center"
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>{f.r1}</span>
                        <span>{f.r2}</span>
                        {i === 9 && <span>{f.r3}</span>}
                    </div>
                    <div style={{ marginTop: 4, fontWeight: "bold" }}>
                        {f.total}
                    </div>
                </div>
            ))}
        </div>
    );
}