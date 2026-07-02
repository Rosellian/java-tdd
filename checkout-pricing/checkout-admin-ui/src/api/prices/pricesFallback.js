import {getPriceList} from "./prices";

export async function getPriceListWithFallback(entry) {
    const priceList = await getPriceList(entry.id);

    if(!priceList) {
        return {priceList: await importPriceList(entry.name), fallback: true};
    }

    return {priceList: priceList, fallback: false};
}

async function importPriceList(name) {
    try {
        const sample = await import(`./samples/${name}.json`);

        return sample.default;
    } catch (err) {
        console.error("Sample price list load failed:", err);

        return null;
    }
}