package com.tdd.api.pricing.rest.data;

public record CartItemRequest(
        String sku,
        int quantity
) {}