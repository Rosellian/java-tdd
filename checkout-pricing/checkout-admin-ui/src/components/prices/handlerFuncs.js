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

export function initPriceLists(setPriceListNames, setFallbackUsed, setStatus, initPriceList) {
    getPriceListNames().then(
        list => {
            const first = loadPriceListNames(list, setPriceListNames, setFallbackUsed);

            setStatus("loading");

            getPriceListWithFallback(first).then(
                ({priceList, fallback}) =>
                    loadPriceList(priceList, fallback, setStatus, initPriceList)
            );
        }
    );
}

function loadPriceListNames(list, setPriceListNames, setFallbackUsed) {
    const names = list ?? DEFAULT_PRICE_LISTS;

    setPriceListNames(names);
    setFallbackUsed(!list);

    return names[0];
}

function loadPriceList(priceList, fallback, setStatus, initPriceList) {
    if (!priceList) {
        setStatus("error");
        return;
    }

    if (!Array.isArray(priceList.unitPrices)) {
        priceList.unitPrices = [];
    }

    initPriceList(priceList, fallback);
}

export function updatePriceListName(priceList, newName, setPriceListNames) {
    if (!priceList) return;

    const updated = {...priceList, name: newName};

    setPriceListNames(prev =>
        prev.map(n => (n === priceList.name ? newName : n))
    );

    return updated;
}

export function updatePriceList(priceList, setPriceList, setSelected, onPriceListChange) {
    setPriceList(priceList);
    const name = priceList.name;
    setSelected(name);
    onPriceListChange(name);
}

export function setLoadedPriceList(setOriginalPriceList, priceList, setFallbackUsed, fallback) {
    setOriginalPriceList(priceList);
    setFallbackUsed(fallback);
}

export function setChanges(setIsDraft, setUnsavedChanges, isUnsaved = false) {
    setIsDraft(isUnsaved);
    setUnsavedChanges(isUnsaved);
}

export function updateChanges(originalPriceList, updatedPriceList, setUnsavedChanges) {
    let noChanges = originalPriceList && isEqualPriceList(updatedPriceList, originalPriceList);
    setUnsavedChanges(!noChanges);
}

function isEqualPriceList(a, b) {
    if (!a || !b) return false;

    if (a.name !== b.name) return false;

    if (a.unitPrices.length !== b.unitPrices.length) return false;

    for (let i = 0; i < a.unitPrices.length; i++) {
        const x = a.unitPrices[i];
        const y = b.unitPrices[i];

        if (x.sku !== y.sku) return false;
        if (x.price !== y.price) return false;
    }

    return true;
}