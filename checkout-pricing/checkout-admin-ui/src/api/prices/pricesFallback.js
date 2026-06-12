import {getPriceList} from "./prices";

export async function getPriceListWithFallback(name) {
    const priceList = await getPriceList(name);

    if(!priceList) {
        return {priceList: await importPriceList(name), fallback: true};
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