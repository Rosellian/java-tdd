import {useEffect, useState} from "react";
import {useTheme} from "../../ui/ThemeProvider";
import {getPriceListNames, getPriceListWithFallback, savePriceList} from "../../api/prices/prices";
import {PriceListSelector} from "./pricelistselector/PriceListSelector";
import {TextInput} from "../ruleseteditor/ruleform/templates/FormFields";
import {PriceListEditor} from "./pricelisteditor/PriceListEditor";
import {ButtonPanel} from "./ButtonPanel";

export function PriceListHandler({ onPriceListChange }) {
    const { theme } = useTheme();

    const [priceListNames, setPriceListNames] = useState([]);
    const [fallbackUsed, setFallbackUsed] = useState(false);
    const [selected, setSelected] = useState("default");
    const [priceList, setPriceList] = useState(null);

    const [mode, setMode] = useState("loading"); // loading, existing, new
    const [status, setStatus] = useState("idle"); // idle, saving, loading, error

    useEffect(() => {
        getPriceListNames().then(list => {
            const names = list ?? DEFAULT_PRICE_LISTS;

            setPriceListNames(names);
            setFallbackUsed(!list);

            setSelected(names[0]);
            setMode("existing");
        });
    }, []);

    useEffect(() => {
        if (mode !== "existing" || !selected) return;

        setStatus("loading");

        getPriceListWithFallback(selected).then(({ priceList, fallback }) => {
            if (!priceList) {
                setStatus("error");
                return;
            }

            if (!Array.isArray(priceList.unitPrices)) {
                priceList.unitPrices = [];
            }

            setPriceList(priceList);
            setFallbackUsed(fallback);
            setStatus("idle");
            onPriceListChange(selected);
        });
    }, [selected, mode]);

    function updatePriceListName(newName) {
        if (!priceList) return;

        const updated = { ...priceList, name: newName };
        setPriceList(updated);

        setPriceListNames(prev =>
            prev.map(n => (n === priceList.name ? newName : n))
        );

        setSelected(newName);
        onPriceListChange(newName);
    }

    function newPriceList() {
        const draft = createNewPriceListDraft();

        setMode("new");
        setPriceList(draft);

        setPriceListNames(prev => [...prev, draft.name]);
        setSelected(draft.name);
        onPriceListChange(draft.name);
    }

    async function handleSave() {
        if (!priceList) return;

        setStatus("saving");

        const ok = await savePriceList(priceList.name, priceList);
        if (ok) {
            setMode("existing");
        }
        setStatus(ok ? "idle" : "error");
    }

    const isPriceListSet = priceList !== null;

    return (
        <div style={{
            ...styles.wrapper,
            ...(theme === "dark" ? styles.wrapperDark : styles.wrapperLight)
        }}>
            <PriceListSelector value={selected} onChange={(v) => {
                setMode("existing");
                setSelected(v);
            }} names={priceListNames}/>

            {isPriceListSet && (
                <TextInput label="Price List Name" field="name" value={priceList.name}
                           update={(field, value) => updatePriceListName(value)}/>
            )}

            <ButtonPanel status={status} handleSave={handleSave} newPriceList={newPriceList} />

            {status === "loading" && <div style={styles.loading}>Loading price list…</div>}
            {status === "error" && <div style={styles.error}>Failed to load or save price list</div>}

            {isPriceListSet && (
                <PriceListEditor priceList={priceList} onChange={setPriceList} />
            )}
        </div>
    );
}

function createNewPriceListDraft() {
    return {
        name: "NewPriceList",
        version: "v1",
        unitPrices: [
            { sku: "", price: 0 }
        ]
    };
}

const DEFAULT_PRICE_LISTS = ["default"];

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