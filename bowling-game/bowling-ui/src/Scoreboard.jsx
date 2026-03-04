import {buildFrames} from "./buildFrames";
import "./Scoreboard.css";
import { detectActiveFrame, detectActiveRoll } from "./detectActive";

export default function Scoreboard({ rolls }) {
    const frames = buildFrames(rolls);

    //const activeFrame = Math.min(9, detectActiveFrame(rolls));
    const activeFrame = detectActiveFrame(rolls);
    const activeRoll = detectActiveRoll(rolls);

    return (
        <div className={"scoreboard"}>
            {frames.map((f, i) => (
                <div key={i} className={`frame ${i === activeFrame ? "active" : ""}`}>
                    <div className="rolls">
                        <span className={i === activeFrame && activeRoll === 1 ? "roll-active" : ""}>{f.r1}</span>
                        <span className={i === activeFrame && activeRoll === 2 ? "roll-active" : ""}>{f.r2}</span>
                        {i === 9 && (
                            <span className={i === activeFrame && activeRoll === 3 ? "roll-active" : ""}>{f.r3}</span>
                        )}
                    </div>
                    <div className="total">{f.total}</div>
                </div>
            ))}
        </div>
    );
}