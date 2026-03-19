import {useEffect, useState} from "react";
import {runPricingTrace} from "./pricingEngine";

export function usePricingTrace(cart, ruleSet) {
    const [trace, setTrace] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!ruleSet || !cart) return;

        setLoading(true);
        setError(null);

        runPricingTrace(cart, ruleSet)
            .then((data) => setTrace(data))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [ruleSet, cart]);

    return { trace, loading, error };
}
