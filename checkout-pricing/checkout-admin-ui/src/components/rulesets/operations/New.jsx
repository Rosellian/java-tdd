import {createNewRulesetDraft} from "../handlerFuncs";
import {buttonStyles} from "./buttonStyles";
import {useTheme} from "../../../ui/theme/ThemeProvider";

export function New({ mode, setMode, setSelected, setRuleset, setRulesetNames, onRulesetChange }) {
    const { theme } = useTheme();

    return (
        <button disabled={mode === "new"} onClick={() => newRuleset(setMode, setSelected, setRuleset,
            setRulesetNames, onRulesetChange)}
                style={{
                    ...buttonStyles.base,
                    ...(theme === "dark" ? styles.newButtonDark : styles.newButtonLight)
        }}>+ New Ruleset</button>
    )
}

function newRuleset(setMode, setSelected, setRuleset, setRulesetNames, onRulesetChange) {
    const draft = createNewRulesetDraft();

    setMode("new");
    setRuleset(draft);

    setRulesetNames(prev => [...prev, draft.name]);
    setSelected(draft.name);
    onRulesetChange(draft.name); //TODO might need to become full ruleset later
}

const styles = {
    newButtonDark: {
        background: "#4CAF50",
        color: "#fff",
    },
    newButtonLight: {
        background: "#4CAF50",
        color: "#000",
    }
}