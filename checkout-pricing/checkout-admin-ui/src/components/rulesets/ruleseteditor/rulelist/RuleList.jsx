import {RuleItem} from "./RuleItem";
import {ButtonPanel} from "./ButtonPanel";

export function RuleList({ rules, selectedRule, onSelect, onAdd, onDelete }) {
    return (
        <div style={styles.list}>
            <h3 style={styles.title}>Rules</h3>

            {rules.map((rule, i) => (
                <RuleItem i={i} rule={rule} isSelected={selectedRule} onSelect={onSelect} />
            ))}

            <ButtonPanel onAdd={onAdd} onDelete={() => onDelete(selectedRule)} />
        </div>
    )
}

const styles = {
    list: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
    },
    title: {
        marginBottom: 8,
        color: "#BB86FC",
    }
}