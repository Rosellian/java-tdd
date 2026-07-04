import {createKeyHeader} from "../security";

const BASE_PATH = "/api/prices";

export async function getPriceListEntries() {
    try {
        const res = await fetch(BASE_PATH, { headers: createKeyHeader() });

        if (!res.ok) {
            console.error("Failed to load price list entries:", res.status);
            return null;
        }

        return await res.json();
    } catch (err) {
        console.error("Error loading price list entries:", err);
        return null;
    }
}

export async function getPriceList(id) {
    try {
        const res = await fetch(`${BASE_PATH}/${id}`, { headers: createKeyHeader() });
        if (!res.ok) {
            return null;
        }

        return await res.json();
    } catch (err) {
        logError("load", err)
        return null;
    }
}

export async function savePriceList(priceList) {
    try {
        const res = await fetch(`${BASE_PATH}/${priceList.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8", ...createKeyHeader() },
            body: JSON.stringify(priceList)
        });

        return res.ok;
    } catch (err) {
        logError("save", err);
        return false;
    }
}

export async function deletePriceList(id) {
    try {
        const res = await fetch(`${BASE_PATH}/${id}`, {
            method: "DELETE",
            headers: createKeyHeader()
        });

        return res.ok;
    } catch (err) {
        logError("delete", err);
        return false;
    }
}

function logError(operation, err) {
    console.error(`Failed to ${operation} price list:`, err);
}