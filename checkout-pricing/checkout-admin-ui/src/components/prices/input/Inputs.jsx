import {TextInput} from "../../rulesets/ruleseteditor/ruleform/templates/FormFields";
import {DiscardChangesModal} from "./DiscardModal";
import {PriceListSelector} from "./selector/PriceListSelector";
import {useState} from "react";

export function Inputs({ priceList, priceListEntries, unsavedChanges, isDraft, selected,
                           setSelected, onDiscardConfirm, triggerUpdatePriceListName }) {
    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const [pendingSelection, setPendingSelection] = useState(null);

    function onSelect(pending) {
        if (unsavedChanges) {
            setPendingSelection(pending);
            setShowDiscardModal(true);

            return;
        }

        setSelected(pending);
    }

    function onConfirm() {
        onDiscardConfirm();
        setSelected(pendingSelection);
        setShowDiscardModal(false);
    }

    const isPriceListSet = priceList !== null;

    return (
        <div style={styles.inputs}>
            <PriceListSelector value={selected} onChange={onSelect} entries={priceListEntries} isDraft={isDraft} />

            {showDiscardModal && (
                <DiscardChangesModal onConfirm={onConfirm} onCancel={() => setShowDiscardModal(false)} />
            )}

            {isPriceListSet && (
                <TextInput label="Price List Name" field="name" value={priceList.name}
                           update={(field, value) => triggerUpdatePriceListName(value)} />
            )}
        </div>
    )
}

const styles = {
    inputs: {
        display: "flex",
        flexDirection: "column",
        gap: 10
    }
}