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