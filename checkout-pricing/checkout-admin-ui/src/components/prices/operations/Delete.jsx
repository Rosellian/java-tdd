import {ConfirmModal} from "../../../ui/ConfirmModal";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {isProtectedPriceList} from "../../../functions/protectedNames";
import {deletePriceList} from "../../../api/prices/prices";
import {useState} from "react";
import {buttonStyles} from "./buttonStyles";

export function Delete({priceList, setPriceList, priceListNames, setPriceListNames, status, setStatus,
                           selected, setSelected }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const [showConfirm, setShowConfirm] = useState(false);

    const isProtectedSelected = theme === "light" && isProtectedPriceList(selected);

    return (
        <div>
            <button disabled={isProtectedSelected}
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
                              onConfirm={ () => confirmDelete(priceList, setPriceList, setShowConfirm,
                                  setStatus, setSelected, priceListNames, setPriceListNames)}
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

async function confirmDelete(priceList, setPriceList, setShowConfirm, setStatus, setSelected,
                             priceListNames, setPriceListNames) {
    setShowConfirm(false);
    setStatus("loading");

    const ok = await deletePriceList(priceList.name);
    if (ok) {
        const updatedNames = priceListNames.filter(n => n !== priceList.name);
        setPriceListNames(updatedNames);

        const next = updatedNames[0] ?? null;

        if (next) {
            setSelected(next);
        } else {
            setPriceList(null);
        }
        setPriceList(null);
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