import {useEffect, useState} from "react";
import {useTheme} from "../../ui/ThemeProvider";
import {RuleList} from "./rulelist/RuleList";
import {RuleForm} from "./ruleform/RuleForm";

export function RulesetEditor({ ruleset, onChange }) {
    const { theme } = useTheme();
    const [selectedRule, setSelectedRule] = useState(0);
    const [draft, setDraft] = useState(ruleset);

    useEffect(() => {
        setDraft(ruleset);
        setSelectedRule(0);
    }, [ruleset]);

    if (!draft || !Array.isArray(draft.rules)) return null;

    const safeIndex = Math.min(selectedRule, draft.rules.length - 1);
    const rule = draft.rules[safeIndex];
    if (!rule) return null;

    function updateRule(index, updatedRule) {
        const updatedRules = [...draft.rules];
        updatedRules[index] = updatedRule;
        const newDraft = { ...draft, rules: updatedRules };

        setDraft(newDraft);
        onChange?.(newDraft);
    }

    function addRule() {
        const newRule = {type: "SpecialPrice", name: "New Rule", sku: "", quantity: 1, price: 0,
            priority: 1, stackable: false};
        const newDraft = { ...draft, rules: [...draft.rules, newRule] };

        setDraft(newDraft);
        onChange?.(newDraft);
        setSelectedRule(newDraft.rules.length - 1);
    }

    function deleteRule(index) {
        const updated = draft.rules.filter((_, i) => i !== index);
        const newDraft = { ...draft, rules: updated };

        setDraft(newDraft);
        onChange?.(newDraft);
        setSelectedRule(0);
    }

    return (
        <div style={{
            ...styles.editor,
            ...(theme === "dark" ? styles.editorDark : styles.editorLight)
        }}>
            <RuleList rules={draft.rules} selectedRule={safeIndex} onSelect={setSelectedRule}
                      onAdd={addRule} onDelete={deleteRule}/>

            <RuleForm rule={rule} onChange={(r) => updateRule(safeIndex, r)}/>
        </div>
    )
}

const styles = {
    editor: {
        display: "grid",
        gridTemplateColumns: "250px 1fr 1fr",
        gap: 16,
        padding: 16,
        borderRadius: 8,
        transition: "background 0.3s ease",
    },
    editorDark: {
        background: "#1a1a1a",
    },
    editorLight: {
        background: "#f5f5f5",
    }
}