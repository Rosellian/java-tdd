import {ConfirmModal} from "../../../ui/ConfirmModal";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {useState} from "react";
import {savePriceList} from "../../../api/prices/prices";
import {buttonStyles} from "./buttonStyles";

export function Save({ priceList, status, setStatus, unsavedChanges, onSave }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const [showConfirm, setShowConfirm] = useState(false);

    async function handleSave() {
        if (!priceList) return;

        setShowConfirm(true);
    }

    async function confirmSave() {
        setShowConfirm(false);

        await save(setStatus, priceList, onSave);
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
                <ConfirmModal message={`Are you sure you want to save changes to "${priceList.name}"?`}
                              onConfirm={confirmSave} onCancel={() => setShowConfirm(false)} />
            )}
        </div>
    )
}

async function save(setStatus, priceList, onSave) {
    setStatus("saving");

    const ok = await savePriceList(priceList);
    if (ok) {
        onSave();
    }

    setStatus(ok ? "idle" : "error");
}