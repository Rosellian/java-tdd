import {useEffect, useRef, useState} from "react";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {RuleList} from "./rulelist/RuleList";
import {RuleForm} from "./ruleform/RuleForm";
import {addRule, cloneRule, deleteRule, getSafeIndex, updateRule} from "./editorOps";
import {CollapsibleSection} from "../../../ui/CollapsibleSection";

export function RulesetEditor({ ruleset, originalRuleset, unsavedChanges, priceList, onChange }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const [selectedRule, setSelectedRule] = useState(0);
    const [draft, setDraft] = useState(ruleset);
    const ruleRefs = useRef({});

    useEffect(() => {
        setDraft(ruleset);
    }, [ruleset]);

    function updateAfterClone(cloneIndex, updatedRuleset) {
        setDraft(updatedRuleset);
        onChange(updatedRuleset);
        setSelectedRule(cloneIndex);
    }

    if (!draft || !Array.isArray(draft.rules)) return null;

    const safeIndex = getSafeIndex(selectedRule, draft);
    const rule = draft.rules[safeIndex];

    if (!rule) return null;

    let originalRule = originalRuleset?.rules?.[safeIndex];

    return (
        <CollapsibleSection title="Ruleset Editor" changed={unsavedChanges} >
            <div style={{
                ...styles.editor,
                ...(isDark ? styles.editorDark : styles.editorLight)
            }}>
                <RuleList rules={draft.rules} selectedRule={safeIndex} ruleRefs={ruleRefs} onSelect={setSelectedRule}
                          onAdd={() => addRule(draft, setDraft, onChange, setSelectedRule)}
                          onDelete={() => deleteRule(safeIndex, draft, setDraft, onChange, setSelectedRule)}
                          onClone={(r) => cloneRule(r, draft, ruleRefs, updateAfterClone)} />

                <RuleForm rule={rule} originalRule={originalRule} priceList={priceList}
                          onChange={(r) => updateRule(safeIndex, r, draft, setDraft, onChange)}/>
            </div>
        </CollapsibleSection>
    )
}

const styles = {
    editor: {
        display: "grid",
        gridTemplateColumns: "250px 1fr",
        gap: 16,
        padding: 16,
        borderRadius: 8,
        transition: "background 0.3s ease"
    },
    editorDark: {
        background: "#1a1a1a"
    },
    editorLight: {
        background: "#f5f5f5"
    }
}