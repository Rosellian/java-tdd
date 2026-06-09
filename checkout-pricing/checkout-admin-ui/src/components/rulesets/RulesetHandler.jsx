import {useEffect, useState} from "react";
import {useTheme} from "../../ui/ThemeProvider";
import {deleteRuleset, getRulesetNames, getRulesetWithFallback, saveRuleset} from "../../api/rulesets/rulesets";
import {RulesetSelector} from "./rulesetselector/RulesetSelector";
import {RulesetEditor} from "./ruleseteditor/RulesetEditor";
import {TextInput} from "./ruleseteditor/ruleform/templates/FormFields";
import {ButtonPanel} from "./ButtonPanel";
import {ConfirmModal} from "../../ui/ConfirmModal";

export function RulesetHandler({ onRulesetChange }) {
    const { theme } = useTheme();

    const [rulesetNames, setRulesetNames] = useState([]);
    const [fallbackUsed, setFallbackUsed] = useState(false);
    const [selected, setSelected] = useState("default");
    const [ruleset, setRuleset] = useState(null);

    const [mode, setMode] = useState("loading"); // loading, existing, new, deleting
    const [status, setStatus] = useState("idle"); // idle, saving, loading, deleting, error
    const [showConfirm, setShowConfirm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        getRulesetNames().then(list => {
            const names = list ?? DEFAULT_RULESETS;

            setRulesetNames(names);
            setFallbackUsed(!list);

            setSelected(names[0]);
            setMode("existing");
        });
    }, []);

    useEffect(() => {
        if (mode !== "existing" || !selected) return;

        setStatus("loading");

        getRulesetWithFallback(selected).then(({ ruleset, fallback }) => {
            if (!ruleset) {
                setStatus("error");
                return;
            }

            if (!Array.isArray(ruleset.rules)) {
                ruleset.rules = [];
            }

            setRuleset(ruleset);
            setFallbackUsed(fallback);
            setStatus("idle");
            onRulesetChange(selected);
        });
    }, [selected, mode]);

    function updateRulesetName(newName) {
        if (!ruleset) return;

        const updatedRuleset = {...ruleset, name: newName};
        setRuleset(updatedRuleset);

        setRulesetNames(prev =>
            prev.map(n => (n === ruleset.name ? newName : n))
        );

        setSelected(newName);
        onRulesetChange(newName); //TODO needs to become full ruleset later
    }

    function newRuleset() {
        const draft = createNewRulesetDraft();

        setMode("new");
        setRuleset(draft);

        setRulesetNames(prev => [...prev, draft.name]);
        setSelected(draft.name);
        onRulesetChange(draft.name); //TODO needs to become full ruleset later
    }

    async function handleSave() {
        if (!ruleset) return;

        setShowConfirm(true);
    }

    async function confirmSave() {
        setShowConfirm(false);

        setStatus("saving");

        const ok = await saveRuleset(ruleset.name, ruleset);
        if(ok) {
            setMode("existing");
        }
        setStatus(ok ? "idle" : "error");
    }

    function handleDelete() {
        if (!ruleset) return;

        setShowDeleteConfirm(true);
    }

    async function confirmDelete() {
        setShowDeleteConfirm(false);
        setStatus("loading");

        const name = ruleset.name;

        const ok = await deleteRuleset(name);
        if (ok) {
            const updated = rulesetNames.filter(n => n !== name);
            setRulesetNames(updated);

            const next = updated[0] ?? null;

            if (next) {
                setSelected(next);
                setMode("existing");
            } else {
                setSelected(null)
                setRuleset(null);
                setMode("loading");
            }
        }

        setStatus(ok ? "idle" : "error");
    }

    const isRulesetSet = ruleset !== null;

    return (
        <div style={{
            ...styles.wrapper,
            ...(theme === "dark" ? styles.wrapperDark : styles.wrapperLight)
        }}>
            <div style={styles.handler}>
                <RulesetSelector value={selected} onChange={(v) => {
                    setMode("existing");
                    setSelected(v);
                }} names={rulesetNames} />

                {isRulesetSet && (<TextInput label="Ruleset Name" field="name" value={ruleset.name} update={
                        (field, value) => updateRulesetName(value)}/>
                )}

                <ButtonPanel mode={mode} status={status} handleSave={handleSave} newRuleset={newRuleset}
                             handleDelete={handleDelete} />
            </div>

            {status === "loading" && <div style={styles.loading}>Loading ruleset…</div>}
            {status === "error" && <div style={styles.error}>Failed to load or save ruleset</div>}
            {showConfirm && (
                <ConfirmModal theme={theme} message={`Are you sure you want to save changes to "${ruleset.name}"?`}
                              onConfirm={confirmSave} onCancel={() => setShowConfirm(false)}/>
            )}
            {showDeleteConfirm && (
                <ConfirmModal theme={theme} message={`Are you sure you want to delete ruleset "${ruleset.name}"?`}
                              onConfirm={confirmDelete} onCancel={() => setShowDeleteConfirm(false)}/>
            )}

            <div style={styles.editorWrapper}>
                {isRulesetSet && (
                    <RulesetEditor ruleset={ruleset} onChange={setRuleset} />
                )}
            </div>
        </div>
    )
}

function createNewRulesetDraft() {
    return {
        name: "NewRuleset",
        version: 1,
        rules: [
            {
                type: "SpecialPrice",
                name: "New Rule",
                sku: "",
                quantity: 1,
                price: 0,
                priority: 1,
                stackable: false
            }
        ]
    };
}

const DEFAULT_RULESETS = ["default", "campaignA", "campaignB", "noCrossNoSkuDiscount"];

const styles = {
    wrapper: {
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        gap: 16,
        padding: 16,
        borderRadius: 6,
        alignSelf: "flex-start",
        transition: "background 0.3s ease",
    },
    wrapperDark: {
        background: "#1a1a1a",
    },
    wrapperLight: {
        background: "#f5f5f5",
    },
    handler: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "fit-content",
        alignSelf: "flex-start",
        gap: 16,
    },
    editorWrapper: {
        width: "100%",
        maxWidth: "755px",
        alignSelf: "stretch",
    },
    loading: {
        opacity: 0.7,
    },
    error: {
        color: "#E53935",
        fontWeight: "bold",
    }
}