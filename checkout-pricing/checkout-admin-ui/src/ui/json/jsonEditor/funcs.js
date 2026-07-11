import {validateSchemaV2} from "../jsonValidation";

export function applyChange(event, setText, schema, setError, onChange) {
    const newText = event.target.value;
    setText(newText);

    try {
        const parsed = JSON.parse(newText);

        if (!validateSchemaV2(parsed, schema)) {
            setError("JSON does not match schema");
            return;
        }

        setError(null);
        onChange(parsed);
    } catch (err) {
        setError("Invalid JSON");
    }
}

export function stringify(value) {
    return JSON.stringify(value, null, 2);
}