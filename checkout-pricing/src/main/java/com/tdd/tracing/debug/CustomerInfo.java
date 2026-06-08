package com.tdd.tracing.debug;

public record CustomerInfo(
        String id,
        String segment
) {

    public static CustomerInfo from(String id, String segment) {
        return new CustomerInfo(id, segment);
    }
}