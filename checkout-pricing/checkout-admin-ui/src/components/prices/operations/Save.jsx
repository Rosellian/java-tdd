import {ConfirmModal} from "../../../ui/ConfirmModal";
import {useTheme} from "../../../ui/ThemeProvider";
import {useState} from "react";
import {savePriceList} from "../../../api/prices/prices";
import {buttonStyles} from "./buttonStyles";

export function Save({ priceList, setMode, status, setStatus }) {
    const { theme } = useTheme();

    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div>
            <button onClick={() => handleSave(priceList, setShowConfirm)}
                    disabled={status === "saving"}
                    style={{
                        ...buttonStyles.base,
                        ...(theme === "dark" ? buttonStyles.dark : buttonStyles.light)
                    }}>{status === "saving" ? "Saving…" : "Save"}</button>

            {showConfirm && (
                <ConfirmModal theme={theme} message={`Are you sure you want to save changes to "${priceList.name}"?`}
                              onConfirm={() => confirmSave(priceList, setShowConfirm, setStatus, setMode)}
                              onCancel={() => setShowConfirm(false)}/>
            )}
        </div>
    )
}

async function handleSave(priceList, setShowConfirm) {
    if (!priceList) return;

    setShowConfirm(true);
}

async function confirmSave(priceList, setShowConfirm, setStatus, setMode) {
    setShowConfirm(false);

    setStatus("saving");

    const ok = await savePriceList(priceList.name, priceList);
    if (ok) {
        setMode("existing");
    }
    setStatus(ok ? "idle" : "error");
}