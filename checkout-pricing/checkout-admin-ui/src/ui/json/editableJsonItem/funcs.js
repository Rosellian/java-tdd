import {validateSchema} from "../jsonValidation";

export function setInitialText(isPrimitive, value) {
    return isPrimitive ? String(value) : JSON.stringify(value, null, 2);
}

export function applyChange(event, setText, isPrimitive, onChange, schema, setError) {
    const newText = event.target.value;
    setText(newText);

    if (isPrimitive) {
        onChange(newText);
        return;
    }

    try {
        const parsed = JSON.parse(newText);

        if (!validateSchema(parsed, schema)) {
            setError("JSON does not match schema");
            return;
        }

        setError(null);
        onChange(parsed);

    } catch {
        setError("Invalid JSON");
    }
}