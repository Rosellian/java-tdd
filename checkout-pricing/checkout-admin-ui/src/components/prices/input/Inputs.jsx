import {TextInput} from "../../rulesets/ruleseteditor/ruleform/templates/FormFields";
import {DiscardChangesModal} from "./DiscardModal";
import {PriceListSelector} from "./selector/PriceListSelector";
import {useState} from "react";

export function Inputs({ priceList, priceListNames, selected, unsavedChanges, isDraft,
                           setSelected, onDiscardConfirm, triggerUpdatePriceListName }) {
    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const [pendingSelection, setPendingSelection] = useState(null);

    function onSelect(value) {
        if (unsavedChanges) {
            setPendingSelection(value);
            setShowDiscardModal(true);
            return;
        }
        setSelected(value);
    }

    function onConfirm() {
        onDiscardConfirm();
        setSelected(pendingSelection);
        setShowDiscardModal(false);
    }

    const isPriceListSet = priceList !== null;

    return (
        <div style={styles.inputs}>
            <PriceListSelector value={selected} onChange={onSelect} names={priceListNames} isDraft={isDraft}
                               selected={selected}/>

            {showDiscardModal && (
                <DiscardChangesModal onConfirm={onConfirm} onCancel={() => setShowDiscardModal(false)}/>
            )}

            {isPriceListSet && (
                <TextInput label="Price List Name" field="name" value={priceList.name}
                           update={(field, value) => triggerUpdatePriceListName(value)}/>
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