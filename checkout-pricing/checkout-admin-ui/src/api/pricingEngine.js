export async function runPricingEngine(cart, ruleSet) {
    const res = await fetch("/api/pricing/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, ruleSet }),
    });

    return await res.json();
}