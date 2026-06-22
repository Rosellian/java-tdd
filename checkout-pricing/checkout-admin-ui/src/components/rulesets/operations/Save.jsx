import {ConfirmModal} from "../../../ui/ConfirmModal";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {saveRuleset} from "../../../api/rulesets/rulesets";
import {buttonStyles} from "./buttonStyles";
import {useState} from "react";

export function Save({ ruleset, status, setStatus, setMode }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div>
            <button onClick={() => handleSave(ruleset, setShowConfirm)} disabled={status === "saving"}
                    style={{
                        ...buttonStyles.base,
                        ...(isDark ? buttonStyles.dark : buttonStyles.light)
                    }}
            >
                {status === "saving" ? "Saving…" : "Save"}
            </button>

            {showConfirm && (
                <ConfirmModal theme={theme} message={`Are you sure you want to save changes to "${ruleset.name}"?`}
                              onConfirm={() => confirmSave(ruleset, setShowConfirm, setStatus, setMode)}
                              onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    )
}

async function handleSave(ruleset, setShowConfirm) {
    if (!ruleset) return;

    setShowConfirm(true);
}

async function confirmSave(ruleset, setShowConfirm, setStatus, setMode) {
    setShowConfirm(false);

    setStatus("saving");

    const ok = await saveRuleset(ruleset.name, ruleset);
    if(ok) {
        setMode("existing");
    }
    setStatus(ok ? "idle" : "error");
}