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

    const mapA = indexPrices(a.unitPrices);
    const mapB = indexPrices(b.unitPrices);

    if (mapA.size !== mapB.size) return false;

    for (const [id, oldPrice] of mapA.entries()) {
        const newPrice = mapB.get(id);
        if (!newPrice) return false;

        if (oldPrice.sku !== newPrice.sku) return false;
        if (oldPrice.price !== newPrice.price) return false;
    }

    return true;
}

export function indexPrices(prices) {
    const map = new Map();
    for (const p of prices) {
        map.set(p.id, p);
    }
    return map;
}