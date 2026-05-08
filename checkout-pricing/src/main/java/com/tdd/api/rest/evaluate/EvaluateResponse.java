package com.tdd.api.rest.evaluate;

import com.tdd.tracing.RuleTrace;

public class EvaluateResponse {
    public RuleTrace trace;

    public EvaluateResponse(RuleTrace trace) {
        this.trace = trace;
    }

    @Override
    public String toString() {
        return "EvaluateResponse{" +
                "trace=" + trace +
                '}';
    }
}