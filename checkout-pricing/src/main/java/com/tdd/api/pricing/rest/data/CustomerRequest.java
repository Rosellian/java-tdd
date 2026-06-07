package com.tdd.api.pricing.rest.data;

public record CustomerRequest(
        String id,
        String segment
) {}