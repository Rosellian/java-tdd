import {useState} from "react";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {buttonStyles} from "./buttonStyles";
import {ConfirmModal} from "../../../ui/ConfirmModal";
import {getPriceListWithFallback} from "../../../api/prices/pricesFallback";

export function Load({ status, setStatus, unsavedChanges, selected, onLoad }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [showConfirm, setShowConfirm] = useState(false);

    function handleLoad() {
        if (!selected) return;

        setShowConfirm(true);
    }

    function confirmLoad() {
        setShowConfirm(false);
        setStatus("loading");

        getPriceListWithFallback(selected).then(({priceList, fallback}) => {
            if (!priceList) {
                setStatus("error");
                return;
            }

            onLoad(priceList, fallback);

            setStatus("idle");
        });
    }

    return (
        <div>
            <button disabled={status === "loading" || unsavedChanges} onClick={handleLoad}
                    style={{
                        ...buttonStyles.base,
                        ...(isDark ? buttonStyles.dark : buttonStyles.light)
                    }}
            >
                {status === "loading" ? "Loading…" : "Load"}
            </button>

            {showConfirm && (
                <ConfirmModal message={`Load price list "${selected}"?`} onConfirm={confirmLoad}
                              onCancel={() => setShowConfirm(false)} />
            )}
        </div>
    )
}