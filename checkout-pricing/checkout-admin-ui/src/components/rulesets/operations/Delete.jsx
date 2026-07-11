import {useState} from "react";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {isProtectedRuleset} from "../../../functions/protectedNames";
import {buttonStyles} from "./buttonStyles";
import {deleteRuleset} from "../../../api/rulesets/rulesets";
import {ConfirmModal} from "../../../ui/ConfirmModal";

export function Delete({ ruleset, rulesetEntries, status, setStatus, isDraft, disabledExp, onDelete }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const [showConfirm, setShowConfirm] = useState(false);

    function handleDelete() {
        if (!ruleset) return;

        if (isProtectedRuleset(ruleset.name)) {
            alert(`Ruleset ${ruleset.name} cannot be deleted.`);
            return;
        }

        setShowConfirm(true);
    }

    async function confirmDelete() {
        setShowConfirm(false);

        if (isDraft) {
            deleteDraft(rulesetEntries, ruleset, onDelete, setStatus);
            return;
        }

        await deleteList(setStatus, ruleset, rulesetEntries, onDelete);
    }

    return (
        <div>
            <button disabled={disabledExp} onClick={handleDelete}
                    style={{
                        ...buttonStyles.base,
                        ...(isDark ? styles.deleteButtonDark : styles.deleteButtonLight),
                        ...(disabledExp ? buttonStyles.buttonDisabled : {})
                    }}>
                {status === "deleting" ? "Deleting…" : "Delete"}
            </button>

            {showConfirm && (
                <ConfirmModal message={`Are you sure you want to delete ruleset "${ruleset.name}"?`}
                              onConfirm={confirmDelete}
                              onCancel={() => setShowConfirm(false)} />
            )}
        </div>
    )
}

function deleteDraft(rulesetEntries, ruleset, onDelete, setStatus) {
    let updatedEntries = removeEntry(rulesetEntries, ruleset);
    onDelete(null, updatedEntries);
    setStatus("idle");
}

async function deleteList(setStatus, ruleset, rulesetEntries, onDelete) {
    setStatus("deleting");

    const ok = await deleteRuleset(ruleset.name);
    if (ok) {
        const updatedEntries = removeEntry(rulesetEntries, ruleset);
        const next = updatedEntries[0] ?? null;

        onDelete(next, updatedEntries);
    }

    setStatus(ok ? "idle" : "error");
}

function removeEntry(rulesetEntries, ruleset) {
    return rulesetEntries.filter(entry => entry.id !== ruleset.id);
}

const styles = {
    deleteButtonDark: {
        background: "#8B0000",
        color: "#fff"
    },
    deleteButtonLight: {
        background: "#FFCCCC",
        color: "#660000"
    }
}