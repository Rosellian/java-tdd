import {getPriceListEntries} from "../../api/prices/prices";
import {getPriceListWithFallback} from "../../api/prices/pricesFallback";
import {createEntry, DEFAULT_PRICE_LISTS, isEqualPriceList} from "./priceFuncs";

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

    let sortedEntries = getSortedEntries(entries);

    setPriceListEntries(sortedEntries);
    setFallbackUsed(!list);

    return sortedEntries[0];
}

function getSortedEntries(entries) {
    return [...entries].sort((a, b) => a.name.localeCompare(b.name));
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