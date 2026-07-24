import {useEffect, useState} from "react";
import {loadLevels} from "../../ops";
import {getLevelIcon} from "../../levels";

export function LevelSelector({ selected, onSelect }) {
    const [levels, setLevels] = useState([]);

    useEffect(() => loadLevels(setLevels), []);

    return (
        <div className="field">
            <label>Triage Level</label>

            <select value={selected.result} onChange={e => onSelect(e.target.value)}>
                {levels.map((level, i) => (
                    <option key={i} value={level}>
                        {level} {getLevelIcon(level)}
                    </option>
                ))}
            </select>
        </div>
    )
}