export function RulesetImportPreview({ current, incoming, onConfirm, onCancel }) {
    return (
        <div style={styles.dialog}>
            <h3>Import Preview</h3>

            <p>Current rules: {current.rules.length}</p>
            <p>Incoming rules: {incoming.rules.length}</p>

            <div style={styles.diffBox}>
                {incoming.rules.map((r, i) => {
                    let border = getItemBorder(current, i, r);

                    return (
                        <div key={r.id} style={{
                            ...styles.diffItem,
                            borderLeft: border
                        }}>
                            {r.name || r.type}
                        </div>
                    );
                })}
            </div>

            <div style={styles.actions}>
                <button style={styles.button} onClick={onCancel}>Cancel</button>

                <button style={{
                    ...styles.button,
                    ...styles.buttonPrimary
                }} onClick={() => onConfirm(incoming)}>Import</button>
            </div>
        </div>
    )
}

function getItemBorder(currentRules, index, newRule) {
    let old = currentRules.rules[index];
    let changed = JSON.stringify(newRule) !== JSON.stringify(old);
    return changed ? "3px solid #FFB300" : "3px solid transparent";
}

const styles = {
    dialog: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: 20,
        borderRadius: 8,
        background: "var(--panel-bg)",
        color: "var(--text-primary)",
        width: "420px",
        maxHeight: "70vh",
        overflowY: "auto",
        boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
        borderTop: "1px solid var(--border-color)",
        borderRight: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)",
        borderLeft: "1px solid var(--border-color)"
    },
    diffBox: {
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: 10,
        borderRadius: 6,
        background: "var(--panel-bg-secondary)",
        borderTop: "1px solid var(--border-color)",
        borderRight: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)",
        borderLeft: "1px solid var(--border-color)"
    },
    diffItem: {
        padding: 6,
        borderLeft: "3px solid transparent",
        transition: "border-color 0.25s ease"
    },
    actions: {
        display: "flex",
        justifyContent: "flex-end",
        gap: 10,
        marginTop: 10
    },
    button: {
        padding: "6px 12px",
        borderRadius: 6,
        cursor: "pointer",
        background: "var(--btn-secondary)",
        color: "var(--text-primary)",
        borderTop: "1px solid var(--border-color)",
        borderRight: "1px solid var(--border-color)",
        borderBottom: "1px solid var(--border-color)",
        borderLeft: "1px solid var(--border-color)",
        transition: "background 0.2s ease, color 0.2s ease"
    },
    buttonPrimary: {
        background: "var(--btn-primary)",
        color: "var(--text-on-primary)"
    }
}