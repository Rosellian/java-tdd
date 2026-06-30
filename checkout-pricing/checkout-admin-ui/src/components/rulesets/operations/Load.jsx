import {useTheme} from "../../../ui/theme/ThemeProvider";
import {useState} from "react";
import {ConfirmModal} from "../../../ui/ConfirmModal";
import {buttonStyles} from "./buttonStyles";
import {getRulesetWithFallback} from "../../../api/rulesets/rulesetsFallback";

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
                <ConfirmModal message={`Load ruleset "${selected}"?`} onConfirm={confirmLoad}
                              onCancel={() => setShowConfirm(false)} />
            )}
        </div>
    )
}

function load(setStatus, selected, onLoad) {
    setStatus("loading");

    getRulesetWithFallback(selected).then(({ruleset, fallback}) => {
        if (!ruleset) {
            setStatus("error");
            return;
        }

        onLoad(ruleset, fallback);

        setStatus("idle");
    });
}