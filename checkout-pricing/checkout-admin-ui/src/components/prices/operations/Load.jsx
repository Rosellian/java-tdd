import {useState} from "react";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {buttonStyles} from "./buttonStyles";
import {ConfirmModal} from "../../../ui/ConfirmModal";
import {getPriceListWithFallback} from "../../../api/prices/pricesFallback";

export function Load({ status, setStatus, disabledExp, selected, onLoad }) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [showConfirm, setShowConfirm] = useState(false);

    let isDisabled = status === "loading" || disabledExp;

    function handleLoad() {
        if (!selected) return;

        setShowConfirm(true);
    }

    function confirmLoad() {
        setShowConfirm(false);
        load(setStatus, selected, onLoad);
    }

    return (
        <div>
            <button disabled={isDisabled} onClick={handleLoad}
                    style={{
                        ...buttonStyles.base,
                        ...(isDark ? buttonStyles.dark : buttonStyles.light),
                        ...(isDisabled ? buttonStyles.buttonDisabled : {})
                    }}
            >
                {status === "loading" ? "Loading…" : "Load"}
            </button>

            {showConfirm && (
                <ConfirmModal message={`Load price list "${selected.name}"?`} onConfirm={confirmLoad}
                              onCancel={() => setShowConfirm(false)} />
            )}
        </div>
    )
}

function load(setStatus, selected, onLoad) {
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