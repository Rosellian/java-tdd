import {useEffect, useState} from "react";
import {useTheme} from "../../ui/theme/ThemeProvider";
import {RulesetEditor} from "./ruleseteditor/RulesetEditor";
import {ButtonPanel} from "./operations/ButtonPanel";
import {handlerStyles} from "./handlerStyles";
import {initRulesets, setChanges, setLoadedRuleset, updateChanges, updateRuleset, updateRulesetName}
    from "./handlerFuncs";
import {StatusBar} from "./status/StatusBar";
import {Inputs} from "./input/Inputs";

export function RulesetHandler({ onRulesetChange }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const [rulesetNames, setRulesetNames] = useState([]);
    const [ruleset, setRuleset] = useState(null);

    const [selected, setSelected] = useState("default");
    const [originalRuleset, setOriginalRuleset] = useState(null);
    const [isDraft, setIsDraft] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState(false);

    const [fallbackUsed, setFallbackUsed] = useState(false);
    const [status, setStatus] = useState("idle"); // idle, saving, loading, deleting, error

    useEffect(() => {
        initRulesets(setRulesetNames, setFallbackUsed, setStatus, initRuleset)
    }, []);

    function initRuleset(ruleset, fallback) {
        updateRuleset(ruleset, setRuleset, setSelected, onRulesetChange);
        setLoadedRuleset(setOriginalRuleset, ruleset, setFallbackUsed, fallback);
        setStatus("idle");
    }

    function onDiscardConfirm() {
        if(isDraft) setRulesetNames(prev => prev.filter(n => n !== selected));
        setRuleset(null);
        setChanges(setIsDraft, setUnsavedChanges);
    }

    function triggerUpdateRulesetName(newName) {
        let updatedRuleset = updateRulesetName(ruleset, newName, setRulesetNames);
        updateChanges(originalRuleset, updatedRuleset, setUnsavedChanges);
        updateRuleset(updatedRuleset, setRuleset, setSelected, onRulesetChange);
    }

    function onLoad(newRuleset, fallback) {
        updateRuleset(newRuleset, setRuleset, setSelected, onRulesetChange);
        setLoadedRuleset(setOriginalRuleset, newRuleset, setFallbackUsed, fallback);
        setChanges(setIsDraft, setUnsavedChanges);
    }

    function onSave() {
        setChanges(setIsDraft, setUnsavedChanges);
    }

    function onDelete(toSelected, updatedNames) {
        setRulesetNames(updatedNames);
        setRuleset(null);
        setSelected(toSelected);
        setChanges(setIsDraft, setUnsavedChanges);
    }

    function onNew(draft) {
        updateRuleset(draft, setRuleset, setSelected, onRulesetChange);
        setRulesetNames(prev => [...prev, draft.name]);
        setChanges(setIsDraft, setUnsavedChanges, true);
    }

    function onEdit(updated) {
        setRuleset(updated);
        updateChanges(originalRuleset, updated, setUnsavedChanges);
    }

    return (
        <div style={{
            ...handlerStyles.wrapper,
            ...(isDark ? handlerStyles.wrapperDark : handlerStyles.wrapperLight)
        }}>
            <div style={handlerStyles.handler}>
                <Inputs ruleset={ruleset} rulesetNames={rulesetNames} unsavedChanges={unsavedChanges} isDraft={isDraft}
                        selected={selected} setSelected={setSelected} onDiscardConfirm={onDiscardConfirm}
                        triggerUpdateRulesetName={triggerUpdateRulesetName} />

                <ButtonPanel status={status} setStatus={setStatus} selected={selected} isDraft={isDraft}
                             unsavedChanges={unsavedChanges} ruleset={ruleset} rulesetNames={rulesetNames}
                             onLoad={onLoad} onSave={onSave} onDelete={onDelete} onNew={onNew} />
            </div>

            <StatusBar status={status} fallbackUsed={fallbackUsed} isDraft={isDraft} unsavedChanges={unsavedChanges}
                       ruleset={ruleset} originalRuleset={originalRuleset} />

            <div style={handlerStyles.editorWrapper}>
                <RulesetEditor ruleset={ruleset} onChange={onEdit} />
            </div>
        </div>
    )
}