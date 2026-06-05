import {useEffect, useState} from "react";
import {useTheme} from "../../ui/ThemeProvider";
import {getRulesetNames, getRulesetWithFallback, saveRuleset} from "../../api/rulesets/rulesets";
import {RulesetSelector} from "./rulesetselector/RulesetSelector";
import {RulesetEditor} from "./ruleseteditor/RulesetEditor";
import {TextInput} from "./ruleseteditor/ruleform/templates/FormFields";
import {ButtonPanel} from "./ButtonPanel";

export function RulesetHandler({ onRulesetChange }) {
    const { theme } = useTheme();

    const [rulesetNames, setRulesetNames] = useState([]);
    const [fallbackUsed, setFallbackUsed] = useState(false);
    const [selected, setSelected] = useState("default");
    const [ruleset, setRuleset] = useState(null);

    const [mode, setMode] = useState("loading"); // loading, existing, new
    const [status, setStatus] = useState("idle"); // idle, saving, loading, error

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

        setStatus("saving");

        const ok = await saveRuleset(ruleset.name, ruleset);
        if(ok) {
            setMode("existing");
        }
        setStatus(ok ? "idle" : "error");
    }

    const isRulesetSet = ruleset !== null;

    return (
        <div style={{
            ...styles.wrapper,
            ...(theme === "dark" ? styles.wrapperDark : styles.wrapperLight)
        }}>
            <RulesetSelector value={selected} onChange={(v) => {
                setMode("existing");
                setSelected(v);
            }} names={rulesetNames} />

            {isRulesetSet && (<TextInput label="Ruleset Name" field="name" value={ruleset.name} update={
                (field, value) => updateRulesetName(value)}/>
            )}

            <ButtonPanel mode={mode} status={status} handleSave={handleSave} newRuleset={newRuleset} />

            {status === "loading" && <div style={styles.loading}>Loading ruleset…</div>}
            {status === "error" && <div style={styles.error}>Failed to load or save ruleset</div>}

            {isRulesetSet && (
                <RulesetEditor ruleset={ruleset} onChange={setRuleset} />
            )}
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
        gap: 16,
        padding: 16,
        borderRadius: 6,
        transition: "background 0.3s ease",
    },
    wrapperDark: {
        background: "#1a1a1a",
    },
    wrapperLight: {
        background: "#f5f5f5",
    },
    loading: {
        opacity: 0.7,
    },
    error: {
        color: "#E53935",
        fontWeight: "bold",
    }
}