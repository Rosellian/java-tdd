import {useEffect, useState} from "react";
import {useTheme} from "../../../ui/theme/ThemeProvider";
import {RuleList} from "./rulelist/RuleList";
import {RuleForm} from "./ruleform/RuleForm";
import {addRule, deleteRule, getSafeIndex, updateRule} from "./editorOps";
import {CollapsibleSection} from "../../../ui/CollapsibleSection";

export function RulesetEditor({ ruleset, onChange }) {
    const { theme } = useTheme();
    let isDark = theme === "dark";

    const [selectedRule, setSelectedRule] = useState(0);
    const [draft, setDraft] = useState(ruleset);

    useEffect(() => {
        setDraft(ruleset);
        setSelectedRule(0);
    }, [ruleset]);

    if (!draft || !Array.isArray(draft.rules)) return null;

    const safeIndex = getSafeIndex(selectedRule, draft);
    const rule = draft.rules[safeIndex];

    if (!rule) return null;

    return (
        <CollapsibleSection title="Ruleset Editor" changed={false} >
            <div style={{
                ...styles.editor,
                ...(isDark ? styles.editorDark : styles.editorLight)
            }}>
                <RuleList rules={draft.rules} selectedRule={safeIndex} onSelect={setSelectedRule}
                          onAdd={() => addRule(draft, setDraft, onChange, setSelectedRule)}
                          onDelete={() => deleteRule(safeIndex, draft, setDraft, onChange, setSelectedRule)}/>

                <RuleForm rule={rule} onChange={(r) => updateRule(safeIndex, r, draft, setDraft, onChange)}/>
            </div>
        </CollapsibleSection>
    )
}

const styles = {
    editor: {
        display: "grid",
        gridTemplateColumns: "250px 1fr 1fr",
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