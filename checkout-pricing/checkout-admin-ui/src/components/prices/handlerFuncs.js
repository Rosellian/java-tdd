import {getPriceListEntries} from "../../api/prices/prices";
import {getPriceListWithFallback} from "../../api/prices/pricesFallback";

export const DEFAULT_PRICE_LISTS = [
    {id: crypto.randomUUID(), name: "default", version: "v1"}];

export function createNewPriceListDraft() {
    return {
        id: crypto.randomUUID(),
        name: "NewPriceList",
        version: "v1",
        unitPrices: [
            { sku: "", price: 0 }
        ]
    };
}

export function createEntry(priceList) {
    return {
        id: priceList.id,
        name: priceList.name,
        version: priceList.version
    };
}

export function initPriceLists(setPriceListEntries, setFallbackUsed, setStatus, initPriceList) {
    getPriceListEntries().then(
        list => {
            const first = loadPriceListNames(list, setPriceListEntries, setFallbackUsed);

            setStatus("loading");

            getPriceListWithFallback(first).then(
                ({priceList, fallback}) =>
                    loadPriceList(priceList, fallback, setStatus, initPriceList)
            );
        });
}

function loadPriceListNames(list, setPriceListEntries, setFallbackUsed) {
    const entries = list ?? DEFAULT_PRICE_LISTS;

    setPriceListEntries(entries);
    setFallbackUsed(!list);

    return entries[0];
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

export function updatePriceListName(priceList, newName, setPriceListEntries) {
    if (!priceList) return;

    const updated = {...priceList, name: newName};

    setPriceListEntries(prev =>
        prev.map(
            entry => (entry.id === priceList.id ?
                {...entry, name: newName}
                : entry)
        )
    );

    return updated;
}

export function updatePriceList(priceList, setPriceList, setSelected, onPriceListChange) {
    setPriceList(priceList);
    let entry = createEntry(priceList);
    setSelected(entry);
    onPriceListChange(entry);
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