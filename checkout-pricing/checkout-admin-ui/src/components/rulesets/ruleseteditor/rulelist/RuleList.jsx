import {RuleItem} from "./RuleItem";
import {ButtonPanel} from "./ButtonPanel";

export function RuleList({ rules, originalRules, selectedRule, ruleRefs, onSelect, onAdd, onDelete, onClone }) {
    return (
        <div style={styles.wrapper}>
            <h3 style={styles.title}>
                Rules
            </h3>

            <RuleItemList rules={rules} originalRules={originalRules} selectedRule={selectedRule} ruleRefs={ruleRefs}
                          onSelect={onSelect} onClone={onClone} />

            <ButtonPanel onAdd={onAdd} onDelete={() => onDelete(selectedRule)} />
        </div>
    )
}

function RuleItemList({ rules, originalRules, selectedRule, ruleRefs, onSelect, onClone }) {
    return (
        <div style={styles.listContainer}>
            {rules.map((rule, i) => {
                let originalRule = originalRules[rule.id];
                let changed = originalRule && JSON.stringify(rule) !== JSON.stringify(originalRule);

                return (
                    <RuleItem ref={el => ruleRefs.current[rule.id] = el} key={i} i={i} rule={rule} changed={changed}
                              isSelected={selectedRule} onSelect={onSelect} onClone={onClone} />
                )
            })}
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