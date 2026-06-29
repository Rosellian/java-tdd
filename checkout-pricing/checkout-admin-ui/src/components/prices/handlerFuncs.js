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

export function loadPriceListNames(list, setPriceListNames, setFallbackUsed) {
    const names = list ?? DEFAULT_PRICE_LISTS;

    setPriceListNames(names);
    setFallbackUsed(!list);

    return names[0];
}

export function loadPriceList(priceList, fallback, setStatus, updatePriceList) {
    if (!priceList) {
        setStatus("error");
        return;
    }

    if (!Array.isArray(priceList.unitPrices)) {
        priceList.unitPrices = [];
    }

    updatePriceList(priceList, fallback);
}

export function updatePriceListName(priceList, newName, setPriceList, setPriceListNames) {
    if (!priceList) return;

    const updated = {...priceList, name: newName};
    setPriceList(updated);

    setPriceListNames(prev =>
        prev.map(n => (n === priceList.name ? newName : n))
    );
}

export function isEqualPriceList(a, b) {
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