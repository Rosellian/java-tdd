import {useEffect, useState} from "react";
import {useTheme} from "../../ui/theme/ThemeProvider";
import {RulesetSelector} from "./rulesetselector/RulesetSelector";
import {RulesetEditor} from "./ruleseteditor/RulesetEditor";
import {TextInput} from "./ruleseteditor/ruleform/templates/FormFields";
import {ButtonPanel} from "./operations/ButtonPanel";
import {handlerStyles} from "./handlerStyles";
import {getInitialState, updateRulesetNames, updateState} from "./handlerFuncs";
import {Save} from "./operations/Save";
import {Delete} from "./operations/Delete";
import {New} from "./operations/New";

export function RulesetHandler({ onRulesetChange }) {
    const { theme } = useTheme();

    const [rulesetNames, setRulesetNames] = useState([]);
    const [selected, setSelected] = useState("default");
    const [ruleset, setRuleset] = useState(null);

    const [fallbackUsed, setFallbackUsed] = useState(false);
    const [mode, setMode] = useState("loading"); // loading, existing, new, deleting
    const [status, setStatus] = useState("idle"); // idle, saving, loading, deleting, error

    useEffect(() => getInitialState(setRulesetNames, setFallbackUsed, setSelected, setMode), []);

    useEffect(() => updateState(mode, selected, setStatus, setRuleset, setFallbackUsed, onRulesetChange),
        [selected, mode]);

    function triggerUpdateRulesetName(newName) {
        updateRulesetNames(ruleset, newName, setRuleset, setRulesetNames, setSelected, onRulesetChange);
    }

    const isRulesetSet = ruleset !== null;

    return (
        <div style={{
            ...handlerStyles.wrapper,
            ...(theme === "dark" ? handlerStyles.wrapperDark : handlerStyles.wrapperLight)
        }}>
            {fallbackUsed && <div style={handlerStyles.fallback}>Failed to load from server, fallback used</div>}

            <div style={handlerStyles.handler}>
                <RulesetSelector value={selected} onChange={(v) => {
                    setMode("existing");
                    setSelected(v);
                }} names={rulesetNames} />

                {isRulesetSet && (<TextInput label="Ruleset Name" field="name" value={ruleset.name} update={
                        (field, value) => triggerUpdateRulesetName(value)}/>
                )}

                <ButtonPanel status={status}>
                    <Save ruleset={ruleset} status={status} setStatus={setStatus} setMode={setMode} />
                    <Delete ruleset={ruleset} setRuleset={setRuleset} rulesetNames={rulesetNames}
                            setRulesetNames={setRulesetNames} selected={selected} setSelected={setSelected}
                            status={status} setStatus={setStatus} setMode={setMode}  />
                    <New mode={mode} setMode={setMode} setSelected={setSelected} setRulesetNames={setRulesetNames}
                         setRuleset={setRuleset} onRulesetChange={onRulesetChange} />
                </ButtonPanel>
            </div>

            {status === "loading" && <div style={handlerStyles.loading}>Loading ruleset…</div>}
            {status === "error" && <div style={handlerStyles.error}>Failed to load or save ruleset</div>}

            <div style={handlerStyles.editorWrapper}>
                {isRulesetSet && (
                    <RulesetEditor ruleset={ruleset} onChange={setRuleset} />
                )}
            </div>
        </div>
    )
}