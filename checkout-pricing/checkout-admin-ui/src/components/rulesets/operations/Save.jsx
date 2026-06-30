import {ConfirmModal} from "../../../ui/ConfirmModal";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {saveRuleset} from "../../../api/rulesets/rulesets";
import {buttonStyles} from "./buttonStyles";
import {useState} from "react";

export function Save({ ruleset, status, setStatus, unsavedChanges, onSave }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const [showConfirm, setShowConfirm] = useState(false);

    async function handleSave() {
        if (!ruleset) return;

        setShowConfirm(true);
    }

    async function confirmSave() {
        setShowConfirm(false);

        await save(setStatus, ruleset, onSave);
    }

    let isDisabled = !unsavedChanges || status === "saving";

    return (
        <div>
            <button onClick={handleSave} disabled={isDisabled}
                    style={{
                        ...buttonStyles.base,
                        ...(isDark ? buttonStyles.dark : buttonStyles.light),
                        ...(isDisabled ? buttonStyles.buttonDisabled : {})
                    }}
            >
                {status === "saving" ? "Saving…" : "Save"}
            </button>

            {showConfirm && (
                <ConfirmModal message={`Are you sure you want to save changes to "${ruleset.name}"?`}
                              onConfirm={confirmSave} onCancel={() => setShowConfirm(false)} />
            )}
        </div>
    )
}

async function save(setStatus, ruleset, onSave) {
    setStatus("saving");

    const ok = await saveRuleset(ruleset.name, ruleset);
    if (ok) {
        onSave(ruleset);
    }

    setStatus(ok ? "idle" : "error");
}