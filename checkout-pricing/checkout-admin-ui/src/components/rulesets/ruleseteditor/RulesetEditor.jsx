import {useEffect, useMemo, useRef, useState} from "react";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {RuleList} from "./rulelist/RuleList";
import {RuleForm} from "./ruleform/RuleForm";
import {addRule, cloneRule, deleteRule, getSafeIndex, updateRule} from "./editorOps";
import {CollapsibleSection} from "../../../ui/CollapsibleSection";
import {RulesetJsonLoader} from "./loader/RulesetJsonLoader";

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

    const originalRules = useMemo(() => mapRuleset(originalRuleset), [originalRuleset]);

    if (!draft || !Array.isArray(draft.rules)) return null;

    const safeIndex = getSafeIndex(selectedRule, draft);
    const rule = draft.rules[safeIndex];

    if (!rule) return null;

    let originalRule = originalRules[rule.id];

    return (
        <CollapsibleSection title="Ruleset Editor" changed={unsavedChanges}
                            rightContent={<RulesetJsonLoader ruleset={draft} onImport={(json) => onChange(json)} />}
        >
            <div style={{
                ...styles.editor,
                ...(isDark ? styles.editorDark : styles.editorLight)
            }}>
                <RuleList rules={draft.rules} originalRules={originalRules} selectedRule={safeIndex}
                          ruleRefs={ruleRefs} onSelect={setSelectedRule}
                          onAdd={() => addRule(draft, setDraft, onChange, setSelectedRule)}
                          onDelete={() => deleteRule(safeIndex, draft, setDraft, onChange, setSelectedRule)}
                          onClone={(r) => cloneRule(r, draft, ruleRefs, updateAfterClone)} />

                <RuleForm rule={rule} originalRule={originalRule} priceList={priceList}
                          onChange={(r) => updateRule(safeIndex, r, draft, setDraft, onChange)}/>
            </div>
        </CollapsibleSection>
    )
}

function mapRuleset(ruleset) {
    if (!ruleset) return {};

    const map = {};
    for (const rule of ruleset.rules) {
        map[rule.id] = rule;
    }

    return map;
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