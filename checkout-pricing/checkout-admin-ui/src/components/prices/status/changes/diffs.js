import {indexPrices} from "../../priceFuncs";

export function diffPriceLists(a, b) {
    if (!a || !b) return ["Price list missing"];

    const diffs = [];

    if (a.name !== b.name) {
        diffs.push(`Name changed (${a.name} → ${b.name})`);
    }

    const mapA = indexPrices(a.unitPrices);
    const mapB = indexPrices(b.unitPrices);

    removed(mapA, mapB, diffs);

    added(mapB, mapA, diffs);

    for (const [id, oldPrice] of mapA.entries()) {
        diffPrice(mapB.get(id), id, oldPrice, diffs);
    }

    return diffs;
}

function removed(mapA, mapB, diffs) {
    for (const [id, oldPrice] of mapA.entries()) {
        if (!mapB.has(id)) {
            diffs.push(`Price removed: SKU ${oldPrice.sku}`);
        }
    }
}

function added(mapB, mapA, diffs) {
    for (const [id, newPrice] of mapB.entries()) {
        if (!mapA.has(id)) {
            diffs.push(`Price added: SKU ${newPrice.sku} = ${newPrice.price}`);
        }
    }
}

function diffPrice(newPrice, id, oldPrice, diffs) {
    if (!newPrice) return;

    if (oldPrice.sku !== newPrice.sku) {
        diffs.push(`SKU changed for price ${id} (${oldPrice.sku} → ${newPrice.sku})`);
    }

    if (oldPrice.price !== newPrice.price) {
        diffs.push(`Price changed for SKU ${oldPrice.sku} (${oldPrice.price} → ${newPrice.price})`);
    }
}