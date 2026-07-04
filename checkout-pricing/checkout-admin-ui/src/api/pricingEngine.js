import {createKeyHeader} from "./security";

export async function runPricingTrace(cart, ruleset, priceList, customer) {
    const res = await callPricingEndpoint(cart, ruleset, priceList, customer, "evaluate");

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} ${text}`);
    }

    return await res.json();
}

async function callPricingEndpoint(cart, ruleset, priceList, customer, endpoint) {
    const body = createBody(cart, ruleset, priceList, customer);

    return await fetch("/api/pricing/" + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8", ...createKeyHeader() },
        body: JSON.stringify(body),
    });
}

function createBody(cart, ruleset, priceList, customer) {
    const items = Object.entries(cart).map(([sku, quantity]) => ({
        sku,
        quantity
    }));

    return {
        ruleset,
        priceList,
        items,
        customer,
        context: {}
    }
}