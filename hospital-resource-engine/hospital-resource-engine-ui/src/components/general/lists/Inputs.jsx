import {TextField} from "../form/TextField";

export function Inputs({ selected, onUpdate }) {
    return (
        <div>
            <TextField label="List Name" name="name" value={selected.name} onUpdate={onUpdate} />

            <TextField label="Version" name="version" value={selected.version} onUpdate={onUpdate} />
        </div>
    )
}