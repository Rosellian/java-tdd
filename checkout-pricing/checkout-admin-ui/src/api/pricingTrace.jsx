import {useEffect, useState} from "react";

export function usePricingTrace(cart, ruleSet) {
    const [trace, setTrace] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!ruleSet || !cart) return;

        setLoading(true);
        setError(null);

        fetch("/api/pricing/trace", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ruleSet, cart }),
        })
            .then((res) => res.json())
            .then((data) => setTrace(data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [ruleSet, cart]);

    return { trace, loading, error };
}
