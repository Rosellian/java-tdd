export async function runPricingEngine(cart, ruleSet) {
    const res = await fetch("/api/pricing/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, ruleSet }),
    });

    return await res.json();
}

export async function runPricingTrace(cart, ruleSet) {
    const res = await fetch("/api/pricing/trace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, ruleSet }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${res.status} ${text}`);
    }

    return await res.json();
}