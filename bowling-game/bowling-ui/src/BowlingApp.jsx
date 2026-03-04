import { useEffect, useState } from "react";
import Scoreboard from "./Scoreboard";

export default function BowlingApp() {
    const [state, setState] = useState(null);
    const [pins, setPins] = useState(0);

    useEffect(() => {
        async function load() {
            const res = await fetch("/api/game");
            const json = await res.json();
            setState(json);
        }
        load();
    }, []);

    const roll = async () => {
        const res = await fetch(`/api/game/roll?pins=${pins}`, { method: "POST" });
        const json = await res.json();
        setState(json);
    };

    const reset = async () => {
        const res = await fetch("/api/game/reset", { method: "POST" });
        const json = await res.json();
        setState(json);
    };

    useEffect(() => {
        console.log("STATE UPDATED:", state);
    }, [state]);


    if (!state) return <p>Laddar...</p>;

    return (
        <div style={{ padding: 20 }}>
            <h1>Bowling Game</h1>

            <Scoreboard rolls={state.rolls ?? []} />

            <p>Frame: {state.frame}</p>
            <p>Score: {state.score}</p>

            <input
                type="number"
                min="0"
                max="10"
                value={pins}
                onChange={e => setPins(e.target.value)}
            />
            <button onClick={roll}>Roll</button>
            <button onClick={reset}>Reset</button>

            {state.complete && <p>Spelet är klart!</p>}
        </div>
    );
}