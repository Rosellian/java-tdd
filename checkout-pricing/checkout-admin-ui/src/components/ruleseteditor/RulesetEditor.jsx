import {useState} from "react";
import {useTheme} from "../../ui/ThemeProvider";
import {RuleList} from "./rulelist/RuleList";
import {RuleForm} from "./ruleform/RuleForm";

export function RulesetEditor({ ruleset, onSave }) {
    const { theme } = useTheme();
    const [selectedRule, setSelectedRule] = useState(0);
    const [draft, setDraft] = useState(ruleset);

    function updateRule(index, updatedRule) {
        const updated = [...draft.rules];
        updated[index] = updatedRule;
        setDraft({ ...draft, rules: updated });
    }

    function addRule() {
        const newRule = {type: "SpecialPrice", name: "New Rule", sku: "", quantity: 1, price: 0,
            priority: 1, stackable: false};
        setDraft({ ...draft, rules: [...draft.rules, newRule] });
        setSelectedRule(draft.rules.length);
    }

    function deleteRule(index) {
        const updated = draft.rules.filter((_, i) => i !== index);
        setDraft({ ...draft, rules: updated });
        setSelectedRule(0);
    }

    return (
        <div style={{
            ...styles.editor,
            ...(theme === "dark" ? styles.editorDark : styles.editorLight)
        }}>
            <RuleList rules={draft.rules} selectedRule={selectedRule} onSelect={setSelectedRule}
                      onAdd={addRule} onDelete={deleteRule}/>

            <RuleForm rule={draft.rules[selectedRule]} onChange={(r) => updateRule(selectedRule, r)}/>
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