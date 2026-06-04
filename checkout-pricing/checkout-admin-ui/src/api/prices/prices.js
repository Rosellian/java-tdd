export async function getPriceListNames() {
    try {
        const res = await fetch("/api/prices");

        if (!res.ok) {
            console.error("Failed to load price list names:", res.status);
            return null;
        }

        return await res.json();
    } catch (err) {
        console.error("Error loading price list names:", err);
        return null;
    }
}

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

export async function getPriceList(name) {
    try {
        const res = await fetch(`/api/prices/${name}`);
        if (!res.ok) return null;
        return await res.json();
    } catch (err) {
        console.error("Failed to load price list:", err);
        return null;
    }
}

export async function savePriceList(name, priceList) {
    try {
        const res = await fetch(`/api/prices/${name}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(priceList)
        });

        return res.ok;
    } catch (err) {
        console.error("Failed to save price list:", err);
        return false;
    }
}