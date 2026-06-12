const BASE_PATH = "/api/prices";

export async function getPriceListNames() {
    try {
        const res = await fetch(BASE_PATH);

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

export async function getPriceList(name) {
    try {
        const res = await fetch(`${BASE_PATH}/${name}`);
        if (!res.ok) {
            return null;
        }

        return await res.json();
    } catch (err) {
        logError("load", err)
        return null;
    }
}

export async function savePriceList(name, priceList) {
    try {
        const res = await fetch(`${BASE_PATH}/${name}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(priceList)
        });

        return res.ok;
    } catch (err) {
        logError("save", err);
        return false;
    }
}

export async function deletePriceList(name) {
    try {
        const res = await fetch(`${BASE_PATH}/${name}`, { method: "DELETE" });

        return res.ok;
    } catch (err) {
        logError("delete", err);
        return false;
    }
}

function logError(operation, err) {
    console.error(`Failed to ${operation} price list:`, err);
}