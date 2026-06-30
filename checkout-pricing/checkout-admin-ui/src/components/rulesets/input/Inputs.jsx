import {useState} from "react";
import {TextInput} from "../ruleseteditor/ruleform/templates/FormFields";
import {RulesetSelector} from "./selector/RulesetSelector";
import {DiscardChangesModal} from "./DiscardChangesModal";

export function Inputs({ ruleset, rulesetNames, unsavedChanges, isDraft, selected,
                       setSelected, onDiscardConfirm, triggerUpdateRulesetName }) {
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

    let isRulesetSet = ruleset !== null;

    return (
        <div style={styles.inputs}>
            <RulesetSelector value={selected} onChange={onSelect} names={rulesetNames} isDraft={isDraft} />

            {showDiscardModal && (
                <DiscardChangesModal onConfirm={onConfirm} onCancel={() => setShowDiscardModal(false)} />
            )}

            {isRulesetSet && (
                <TextInput label="Ruleset Name" field="name" value={ruleset.name}
                           update={(field, value) => triggerUpdateRulesetName(value)} />
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