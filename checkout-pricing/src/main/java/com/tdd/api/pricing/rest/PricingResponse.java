package com.tdd.api.pricing.rest;

import com.tdd.tracing.RuleTrace;
import com.tdd.tracing.debug.PricingTrace;
import com.tdd.utils.TraceResult;

public record PricingResponse(
        RuleTrace inspectionTrace,
        PricingTrace debuggerTrace
) {

    public static PricingResponse from(TraceResult traceResult) {
        return new PricingResponse(traceResult.ruleTrace(), traceResult.pricingTrace());
    }
}