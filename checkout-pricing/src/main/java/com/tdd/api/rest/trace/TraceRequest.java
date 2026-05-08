package com.tdd.api.rest.trace;

import com.tdd.api.rest.PricingRequest;

public class TraceRequest {
    public PricingRequest request;

    @Override
    public String toString() {
        return "TraceRequest{" +
                "request=" + request +
                '}';
    }
}
