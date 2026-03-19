import { useState } from "react";
import {runPricingTrace} from "./pricingEngine";

export function usePricingTrace() {
    const [trace, setTrace] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function getTrace(cart, ruleSet) {
        if (!cart || !ruleSet) {
            setError("Missing cart or ruleSet");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await runPricingTrace(cart, ruleSet);
            setTrace(result);
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