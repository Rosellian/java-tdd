export async function runPricingEngine(cart, ruleSet) {
    const res = await callPricingEndpoint(cart, ruleSet, "evaluate");

    return await res.json();
}

export async function runPricingTrace(cart, ruleSet) {
    const res = await callPricingEndpoint(cart, ruleSet, "trace");

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} ${text}`);
    }

    return await res.json();
}

async function callPricingEndpoint(cart, ruleSet, endpoint) {
    return await fetch("/api/pricing/" + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, ruleSet }),
    });
}