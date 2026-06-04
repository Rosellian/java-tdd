import { useState } from "react";
import {runPricingTrace} from "./pricingEngine";

export function usePricingTrace() {
    const [trace, setTrace] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function getTrace(cart, ruleset, priceList) {
        if (!cart || !ruleset || !priceList) {
            setError("Missing cart or ruleset");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await runPricingTrace(cart, ruleset, priceList);
            setTrace(result.trace);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        traceNew: trace,
        loading,
        error,
        getTrace,
    };
}