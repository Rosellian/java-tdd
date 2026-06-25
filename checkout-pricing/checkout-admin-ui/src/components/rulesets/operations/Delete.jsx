import {useState} from "react";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {isProtectedRuleset} from "../../../functions/protectedNames";
import {buttonStyles} from "./buttonStyles";
import {deleteRuleset} from "../../../api/rulesets/rulesets";
import {ConfirmModal} from "../../../ui/ConfirmModal";

export function Delete({ ruleset, setRuleset, rulesetNames, setRulesetNames, status, setStatus, setMode,
                           selected, setSelected }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const [showConfirm, setShowConfirm] = useState(false);

    const isProtectedSelected = theme === "light" && isProtectedRuleset(selected);

    return (
        <div>
            <button disabled={isProtectedSelected} onClick={() => handleDelete(ruleset, setShowConfirm)}
                    title={isProtectedSelected ? "This ruleset cannot be deleted" : ""}
                    style={{
                        ...buttonStyles.base,
                        ...(isDark ? styles.deleteButtonDark : styles.deleteButtonLight),
                        ...(isProtectedSelected ? styles.buttonDisabled : {})
                    }}
            >
                {status === "deleting" ? "Deleting…" : "Delete"}
            </button>

            {showConfirm && (
                <ConfirmModal message={`Are you sure you want to delete ruleset "${ruleset.name}"?`}
                              onConfirm={() => confirmDelete(ruleset, setRuleset, rulesetNames,
                                  setRulesetNames, setShowConfirm, setStatus, setMode, setSelected)}
                              onCancel={() => setShowConfirm(false)} />
            )}
        </div>
    )
}

function handleDelete(ruleset, setShowConfirm) {
    if (!ruleset) return;

    if (isProtectedRuleset(ruleset.name)) {
        alert(`Ruleset ${ruleset.name} cannot be deleted.`);
        return;
    }

    setShowConfirm(true);
}

async function confirmDelete(ruleset, setRuleset, rulesetNames, setRulesetNames, setShowConfirm, setStatus,
                             setMode, setSelected) {
    setShowConfirm(false);
    setStatus("loading");

    const name = ruleset.name;

    const ok = await deleteRuleset(name);
    if (ok) {
        const updated = rulesetNames.filter(n => n !== name);
        setRulesetNames(updated);

        const next = updated[0] ?? null;

        if (next) {
            setSelected(next);
            setMode("existing");
        } else {
            setSelected(null)
            setRuleset(null);
            setMode("loading");
        }
    }

    setStatus(ok ? "idle" : "error");
}

const styles = {
    buttonDisabled: {
        opacity: 0.5,
        cursor: "not-allowed"
    },
    deleteButtonDark: {
        background: "#8B0000",
        color: "#fff"
    },
    deleteButtonLight: {
        background: "#FFCCCC",
        color: "#660000"
    }
}