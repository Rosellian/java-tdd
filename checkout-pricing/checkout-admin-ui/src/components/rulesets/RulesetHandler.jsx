import {useEffect, useState} from "react";
import {useTheme} from "../../ui/theme/ThemeProvider";
import {RulesetEditor} from "./ruleseteditor/RulesetEditor";
import {ButtonPanel} from "./operations/ButtonPanel";
import {handlerStyles} from "./handlerStyles";
import {initRulesets, setChanges, setLoadedRuleset, updateChanges, updateRuleset, updateRulesetName}
    from "./handlerFuncs";
import {StatusBar} from "./status/StatusBar";
import {Inputs} from "./input/Inputs";
import {createEntry} from "./functions/rulesetFuncs";
import {RulePreview} from "./preview/RulePreview";

export function RulesetHandler({ onRulesetChange, priceList }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const [rulesetEntries, setRulesetEntries] = useState([]);
    const [ruleset, setRuleset] = useState(null);

    const [selected, setSelected] = useState(null);
    const [originalRuleset, setOriginalRuleset] = useState(null);
    const [isDraft, setIsDraft] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState(false);

    const [fallbackUsed, setFallbackUsed] = useState(false);
    const [status, setStatus] = useState("idle"); // idle, saving, loading, deleting, error

    useEffect(() => {
        initRulesets(setRulesetEntries, setFallbackUsed, setStatus, initRuleset)
    }, []);

    function initRuleset(ruleset, fallback) {
        updateRuleset(ruleset, setRuleset, setSelected, onRulesetChange);
        setLoadedRuleset(setOriginalRuleset, ruleset, setFallbackUsed, fallback);
        setStatus("idle");
    }

    function onDiscardConfirm() {
        if(isDraft) setRulesetEntries(prev => prev.filter(entry => entry.id !== selected.id));
        setRuleset(null);
        setChanges(setIsDraft, setUnsavedChanges);
    }

    function triggerUpdateRulesetName(newName) {
        let updatedRuleset = updateRulesetName(ruleset, newName, setRulesetEntries);
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

    function onDelete(toSelected, updatedEntries) {
        setRulesetEntries(updatedEntries);
        setRuleset(null);
        setSelected(toSelected);
        setChanges(setIsDraft, setUnsavedChanges);
    }

    function onNew(draft) {
        updateRuleset(draft, setRuleset, setSelected, onRulesetChange);
        setRulesetEntries(prev => [...prev, createEntry(draft)]);
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
            <div style={handlerStyles.topRow}>
                <div style={handlerStyles.leftTop}>
                    <Inputs ruleset={ruleset} rulesetEntries={rulesetEntries} unsavedChanges={unsavedChanges}
                            isDraft={isDraft} selected={selected} setSelected={setSelected}
                            onDiscardConfirm={onDiscardConfirm} triggerUpdateRulesetName={triggerUpdateRulesetName} />

                    <ButtonPanel status={status} setStatus={setStatus} selected={selected} isDraft={isDraft}
                                 unsavedChanges={unsavedChanges} ruleset={ruleset} rulesetEntries={rulesetEntries}
                                 onLoad={onLoad} onSave={onSave} onDelete={onDelete} onNew={onNew} />
                </div>

                <div style={handlerStyles.rightTop}>
                    <RulePreview ruleset={ruleset} />
                </div>
            </div>

            <StatusBar status={status} fallbackUsed={fallbackUsed} isDraft={isDraft} unsavedChanges={unsavedChanges}
                       ruleset={ruleset} originalRuleset={originalRuleset} />

            <div style={handlerStyles.editorWrapper}>
                <RulesetEditor ruleset={ruleset} onChange={onEdit} unsavedChanges={unsavedChanges}
                               priceList={priceList} />
            </div>

        </div>
    )
}