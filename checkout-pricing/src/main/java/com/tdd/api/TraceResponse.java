package com.tdd.api;

import com.tdd.tracing.debug.PricingTrace;

public class TraceResponse {
    public PricingTrace trace;

    public TraceResponse(PricingTrace trace) {
        this.trace = trace;
    }
}
