import {useState} from "react";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {isProtectedRuleset} from "../../../functions/protectedNames";
import {buttonStyles} from "./buttonStyles";
import {deleteRuleset} from "../../../api/rulesets/rulesets";
import {ConfirmModal} from "../../../ui/ConfirmModal";

export function Delete({ ruleset, rulesetNames, status, setStatus, isDraft, disabledExp, onDelete }) {
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
            deleteDraft(rulesetNames, ruleset, onDelete, setStatus);
            return;
        }

        await deleteList(setStatus, ruleset, rulesetNames, onDelete);
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

function deleteDraft(rulesetNames, ruleset, onDelete, setStatus) {
    let namesWithCurrentRemoved = removeList(rulesetNames, ruleset);
    onDelete(null, namesWithCurrentRemoved);
    setStatus("idle");
}

async function deleteList(setStatus, ruleset, rulesetNames, onDelete) {
    setStatus("deleting");

    const ok = await deleteRuleset(ruleset.name);
    if (ok) {
        const updatedNames = removeList(rulesetNames, ruleset);
        const next = updatedNames[0] ?? null;

        onDelete(next, updatedNames);
    }

    setStatus(ok ? "idle" : "error");
}

function removeList(rulesetNames, ruleset) {
    return rulesetNames.filter(n => n !== ruleset.name);
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