import {getPriceListNames} from "../../api/prices/prices";
import {getPriceListWithFallback} from "../../api/prices/pricesFallback";

export const DEFAULT_PRICE_LISTS = ["default"];

export function createNewPriceListDraft() {
    return {
        name: "NewPriceList",
        version: "v1",
        unitPrices: [
            { sku: "", price: 0 }
        ]
    };
}

export function getInitialState(setPriceListNames, setFallbackUsed, setSelected, setMode) {
    getPriceListNames().then(list => {
        const names = list ?? DEFAULT_PRICE_LISTS;

        setPriceListNames(names);
        setFallbackUsed(!list);

        setSelected(names[0]);
        setMode("existing");
    });
}

export function updateState(mode, selected, setStatus, setPriceList, setFallbackUsed, onPriceListChange) {
    if (mode !== "existing" || !selected) return;

    setStatus("loading");

    getPriceListWithFallback(selected).then(({priceList, fallback}) => {
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
}

export function updatePriceListName(priceList, newName, setPriceList, setPriceListNames, setSelected,
                                    onPriceListChange) {
    if (!priceList) return;

    const updated = {...priceList, name: newName};
    setPriceList(updated);

    setPriceListNames(prev =>
        prev.map(n => (n === priceList.name ? newName : n))
    );

    setSelected(newName);
    onPriceListChange(newName);
}