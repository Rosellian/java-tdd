import {ConfirmModal} from "../../../ui/ConfirmModal";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {isProtectedPriceList} from "../../../functions/protectedNames";
import {deletePriceList} from "../../../api/prices/prices";
import {useState} from "react";
import {buttonStyles} from "./buttonStyles";

export function Delete({ priceList, priceListNames, setPriceListNames, status, setStatus, selected, setSelected,
                           isDraft, unsavedChanges, onDelete }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const [showConfirm, setShowConfirm] = useState(false);

    const isProtectedSelected = theme === "light" && isProtectedPriceList(selected);

    return (
        <div>
            <button disabled={isProtectedSelected || unsavedChanges}
                    onClick={() => handleDelete(priceList, setShowConfirm)}
                    title={isProtectedSelected ? "This price list cannot be deleted" : ""}
                    style={{
                        ...buttonStyles.base,
                        ...(isDark ? styles.deleteButtonDark : styles.deleteButtonLight),
                        ...(isProtectedSelected ? styles.buttonDisabled : {})
            }}>
                {status === "deleting" ? "Deleting…" : "Delete"}
            </button>

            {showConfirm && (
                <ConfirmModal message={`Are you sure you want to delete price list "${priceList.name}"?`}
                              onConfirm={ () => confirmDelete(priceList, priceListNames,
                                  setPriceListNames, setShowConfirm, setStatus, setSelected, isDraft, onDelete)}
                              onCancel={() => setShowConfirm(false)} />
            )}
        </div>
    )
}

function handleDelete(priceList, setShowConfirm) {
    if (!priceList) return;

    if (isProtectedPriceList(priceList.name)) {
        alert(`Price list ${priceList.name} cannot be deleted.`);
        return;
    }

    setShowConfirm(true);
}

async function confirmDelete(priceList, priceListNames, setPriceListNames, setShowConfirm, setStatus, setSelected,
                             isDraft, onDelete) {
    setShowConfirm(false);

    if (isDraft) {
        setPriceListNames(prev => prev.filter(n => n !== priceList.name));
        setSelected(null);
        onDelete();
        return;
    }

    setStatus("loading");

    const ok = await deletePriceList(priceList.name);
    if (ok) {
        const updatedNames = priceListNames.filter(n => n !== priceList.name);
        setPriceListNames(updatedNames);

        const next = updatedNames[0] ?? null;
        if (next) {
            setSelected(next);
        }

        onDelete();
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