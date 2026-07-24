import {useEffect, useState} from "react";
import {loadLevels} from "../../ops";
import {getIcon} from "../../../../resources/types";

export function LevelSelector({ selected, onSelect }) {
    const [levels, setLevels] = useState([]);

    useEffect(() => loadLevels(setLevels), []);

    return (
        <div className="field">
            <label>Triage Level</label>

            <select value={selected.result} onChange={e => onSelect(e.target.value)}>
                {levels.map((level, i) => (
                    <option key={i} value={level}>
                        {level} {getIcon(level)}
                    </option>
                ))}
            </select>
        </div>
    )
}