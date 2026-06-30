import {createNewRulesetDraft} from "../handlerFuncs";
import {buttonStyles} from "./buttonStyles";
import {useTheme} from "../../../ui/theme/ThemeProvider";

export function New({ unsavedChanges, onNew }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    return (
        <button disabled={unsavedChanges} onClick={() => newRuleset(onNew)}
                style={{
                    ...buttonStyles.base,
                    ...(isDark ? styles.newButtonDark : styles.newButtonLight),
                    ...(unsavedChanges ? buttonStyles.buttonDisabled : {})
                }}>
            + New Ruleset
        </button>
    )
}

function newRuleset(onNew) {
    const draft = createNewRulesetDraft();

    onNew(draft);
}

const styles = {
    newButtonDark: {
        background: "#4CAF50",
        color: "#fff"
    },
    newButtonLight: {
        background: "#4CAF50",
        color: "#000"
    }
}