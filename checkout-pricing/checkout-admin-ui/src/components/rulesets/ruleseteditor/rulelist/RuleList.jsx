import {RuleItem} from "./RuleItem";
import {ButtonPanel} from "./ButtonPanel";

export function RuleList({ rules, selectedRule, onSelect, onAdd, onDelete, onClone }) {
    return (
        <div style={styles.wrapper}>
            <h3 style={styles.title}>
                Rules
            </h3>

            <RuleItemList rules={rules} selectedRule={selectedRule} onSelect={onSelect} onClone={onClone} />

            <ButtonPanel onAdd={onAdd} onDelete={() => onDelete(selectedRule)} />
        </div>
    )
}

function RuleItemList({ rules, selectedRule, onSelect, onClone }) {
    return (
        <div style={styles.listContainer}>
            {rules.map((rule, i) => ( //TODO add id to rules to supply a unique key
                <RuleItem key={i} i={i} rule={rule} isSelected={selectedRule} onSelect={onSelect} onClone={onClone} />
            ))}
        </div>
    )
}

const styles = {
    wrapper: {
        display: "flex",
        flexDirection: "column",
        gap: 8
    },
    title: {
        marginBottom: 8,
        color: "#BB86FC"
    },
    listContainer: {
        maxHeight: "250px",
        overflowY: "auto",
        paddingRight: 4,
        display: "flex",
        flexDirection: "column",
        gap: 8
    }
}