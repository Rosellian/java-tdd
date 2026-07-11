import {ConfirmModal} from "../../../ui/ConfirmModal";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {isProtectedPriceList} from "../../../functions/protectedNames";
import {deletePriceList} from "../../../api/prices/prices";
import {useState} from "react";
import {buttonStyles} from "./buttonStyles";

export function Delete({ priceList, priceListEntries, status, setStatus, isDraft, disabledExp, onDelete }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const [showConfirm, setShowConfirm] = useState(false);

    function handleDelete() {
        if (!priceList) return;

        if (isProtectedPriceList(priceList.name)) {
            alert(`Price list ${priceList.name} cannot be deleted.`);
            return;
        }

        setShowConfirm(true);
    }

    async function confirmDelete() {
        setShowConfirm(false);

        if (isDraft) {
            deleteDraft(priceListEntries, priceList, onDelete, setStatus);
            return;
        }

        await deleteList(setStatus, priceList, priceListEntries, onDelete);
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
                <ConfirmModal message={`Are you sure you want to delete price list "${priceList.name}"?`}
                              onConfirm={confirmDelete}
                              onCancel={() => setShowConfirm(false)} />
            )}
        </div>
    )
}

function deleteDraft(priceListEntries, priceList, onDelete, setStatus) {
    let updatedEntries = removeEntry(priceListEntries, priceList);
    onDelete(null, updatedEntries);
    setStatus("idle");
}

async function deleteList(setStatus, priceList, priceListEntries, onDelete) {
    setStatus("deleting");

    const ok = await deletePriceList(priceList.name);
    if (ok) {
        const updatedEntries = removeEntry(priceListEntries, priceList);
        const next = updatedEntries[0] ?? null;

        onDelete(next, updatedEntries);
    }

    setStatus(ok ? "idle" : "error");
}

function removeEntry(priceListEntries, priceList) {
    return priceListEntries.filter(entry => entry.id !== priceList.id);
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