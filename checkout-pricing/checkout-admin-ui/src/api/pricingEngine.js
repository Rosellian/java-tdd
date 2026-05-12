export async function runPricingEngine(cart, ruleset) {
    const res = await callPricingEndpoint(cart, ruleset, "evaluate");

    return await res.json();
}

export async function runPricingTrace(cart, ruleset) {
    const res = await callPricingEndpoint(cart, ruleset, "trace");

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} ${text}`);
    }

    return await res.json();
}

async function callPricingEndpoint(cart, ruleset, endpoint) {
    return await fetch("/api/pricing/" + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, ruleset }),
    });
}