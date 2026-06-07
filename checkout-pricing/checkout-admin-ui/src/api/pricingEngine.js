export async function runPricingTrace(cart, ruleset, priceList) {
    const res = await callPricingEndpoint(cart, ruleset, priceList, "evaluate");

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} ${text}`);
    }

    return await res.json();
}

async function callPricingEndpoint(cart, ruleset, priceList, endpoint) {
    return await fetch("/api/pricing/" + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, ruleset, priceList }),
    });
}