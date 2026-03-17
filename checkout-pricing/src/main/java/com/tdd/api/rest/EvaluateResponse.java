package com.tdd.api.rest;

import com.tdd.tracing.RuleTrace;

public class EvaluateResponse {
    public RuleTrace trace;

    public EvaluateResponse(RuleTrace trace) {
        this.trace = trace;
    }
}