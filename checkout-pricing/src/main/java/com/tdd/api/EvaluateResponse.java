package com.tdd.api;

import com.tdd.logging.RuleTrace;

public class EvaluateResponse {
    public RuleTrace trace;

    public EvaluateResponse(RuleTrace trace) {
        this.trace = trace;
    }
}