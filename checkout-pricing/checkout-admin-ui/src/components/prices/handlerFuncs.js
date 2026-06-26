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

export function getInitialState(setPriceListNames, setPriceList, setFallbackUsed, setSelected, setLoaded, setStatus,
    onPriceListChange) {
    getPriceListNames().then(
        updatePriceListNamesAndCurrentList(setPriceListNames, setFallbackUsed, setSelected, setLoaded, setStatus,
            setPriceList, onPriceListChange)
    );
}

function updatePriceListNamesAndCurrentList(setPriceListNames, setFallbackUsed, setSelected, setLoaded, setStatus,
                                            setPriceList, onPriceListChange) {
    return list => {
        const names = list ?? DEFAULT_PRICE_LISTS;

        setPriceListNames(names);
        setFallbackUsed(!list);

        const first = names[0];
        setSelected(first);
        setLoaded(first);

        setStatus("loading");

        getPriceListWithFallback(first).then(
            updatePriceList(first, setStatus, setPriceList, setFallbackUsed, onPriceListChange)
        );
    };
}

function updatePriceList(name, setStatus, setPriceList, setFallbackUsed, onPriceListChange) {
    return ({priceList, fallback}) => {
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
        onPriceListChange(name);
    };
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