import {Load} from "./Load";
import {Delete} from "./Delete";
import {New} from "./New";
import {Save} from "./Save";

export function ButtonPanel({ status, setStatus, selected, isDraft, unsavedChanges, ruleset, rulesetNames,
                                onLoad, onSave, onDelete, onNew }) {
    let disabledExp = isDraft || unsavedChanges;

    return (
        <div style={styles.buttonPanel}>
            <Load status={status} setStatus={setStatus} selected={selected} disabledExp={disabledExp} onLoad={onLoad} />

            <Save ruleset={ruleset} status={status} setStatus={setStatus} unsavedChanges={unsavedChanges}
                  onSave={onSave} />

            <Delete ruleset={ruleset} rulesetNames={rulesetNames} status={status} setStatus={setStatus}
                    selected={selected} isDraft={isDraft} disabledExp={disabledExp} onDelete={onDelete} />

            <New unsavedChanges={unsavedChanges} onNew={onNew} />
        </div>
    )
}

const styles = {
    buttonPanel: {
        display: "flex",
        flexDirection: "column",
        gap: 15
    }
}