import {useState} from "react";
import {useTheme} from "../../ui/ThemeProvider";

export function RulesetEditor({ ruleset, onSave }) {
    const { theme } = useTheme();
    const [selectedRule, setSelectedRule] = useState(0);
    const [draft, setDraft] = useState(ruleset);

    return (
        <div style={{
            ...styles.editor,
            ...(theme === "dark" ? styles.editorDark : styles.editorLight)
        }}>

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