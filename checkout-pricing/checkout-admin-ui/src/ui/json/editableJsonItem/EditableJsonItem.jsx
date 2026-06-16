import {useEffect, useState} from "react";
import {AnimatedBody} from "../../AnimatedBody";
import {applyChange, stringifyText} from "./funcs";
import {ItemHeader} from "./ItemHeader";
import {PrimitiveInput} from "./PrimitiveInput";
import {JsonInput} from "./JsonInput";

export function EditableJsonItem({ label, value, originalValue, schema, onChange, isPrimitive }) {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState(stringifyText(isPrimitive, value));
    const [error, setError] = useState(null);

    const changed = JSON.stringify(value) !== JSON.stringify(originalValue);

    useEffect(() => {
        setText(stringifyText(isPrimitive, value));
    }, [value]);

    function handleChange(e) {
        applyChange(e, setText, isPrimitive, onChange, schema, setError);
    }

    return (
        <div style={styles.container}>
            <ItemHeader label={label} open={open} setOpen={setOpen} changed={changed} />

            <AnimatedBody open={open}>
                {isPrimitive ?
                    <PrimitiveInput value={text} onChange={handleChange} changed={changed} />
                    : <JsonInput value={text} onChange={handleChange} changed={changed} error={error} />}
            </AnimatedBody>
        </div>
    )
}

const styles = {
    container: {
        marginBottom: 10
    }
}