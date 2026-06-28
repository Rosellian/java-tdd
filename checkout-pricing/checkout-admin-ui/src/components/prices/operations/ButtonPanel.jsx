import {New} from "./New";
import {Delete} from "./Delete";
import {Save} from "./Save";
import {Load} from "./Load";

export function ButtonPanel({ status, setStatus, selected, isDraft, unsavedChanges, priceList, priceListNames,
                                onLoad, onSave, onDelete, onNew }) {
    let disabledExp = isDraft || unsavedChanges;

    return (
        <div style={styles.buttonPanel}>
            <Load status={status} setStatus={setStatus} selected={selected} disabledExp={disabledExp} onLoad={onLoad} />

            <Save priceList={priceList} status={status} setStatus={setStatus} unsavedChanges={unsavedChanges}
                  onSave={onSave} />

            <Delete priceList={priceList} priceListNames={priceListNames} status={status} setStatus={setStatus}
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