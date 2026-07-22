import {useEffect, useState} from "react";
import {loadTypes} from "../../ops";
import {getIcon} from "../../types";

export function TypeSelector({ selected, onSelect }) {
    const [types, setTypes] = useState([]);

    useEffect(() => loadTypes(setTypes), []);

    return (
        <div className="field">
            <label>Resource Type</label>

            <select value={selected.type} onChange={e => onSelect(e.target.value)}>
                {types.map((type, i) => (
                    <option key={i} value={type}>
                        {type} {getIcon(type)}
                    </option>
                ))}
            </select>
        </div>
    )
}