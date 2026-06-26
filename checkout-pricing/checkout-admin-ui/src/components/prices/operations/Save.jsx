import {ConfirmModal} from "../../../ui/ConfirmModal";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {useState} from "react";
import {savePriceList} from "../../../api/prices/prices";
import {buttonStyles} from "./buttonStyles";

export function Save({ priceList, status, setStatus, unsavedChanges, onSave }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div>
            <button onClick={() => handleSave(priceList, setShowConfirm)}
                    disabled={!unsavedChanges || status === "saving"}
                    style={{
                        ...buttonStyles.base,
                        ...(isDark ? buttonStyles.dark : buttonStyles.light)
                    }}
            >
                {status === "saving" ? "Saving…" : "Save"}
            </button>

            {showConfirm && (
                <ConfirmModal message={`Are you sure you want to save changes to "${priceList.name}"?`}
                              onConfirm={() => confirmSave(priceList, setShowConfirm, setStatus, onSave)}
                              onCancel={() => setShowConfirm(false)}/>
            )}
        </div>
    )
}

async function handleSave(priceList, setShowConfirm) {
    if (!priceList) return;

    setShowConfirm(true);
}

async function confirmSave(priceList, setShowConfirm, setStatus, onSave) {
    setShowConfirm(false);

    setStatus("saving");

    const ok = await savePriceList(priceList.name, priceList);
    if(ok) {
        onSave(priceList);
    }

    setStatus(ok ? "idle" : "error");
}