package com.tdd.api.pricing.rest.data;

import java.util.Map;

public record CartItemRequest(
        String sku,
        int quantity
) {

    public static CartItemRequest fromCartEntry(Map.Entry<String, Integer> entry) {

        return new CartItemRequest(entry.getKey(), entry.getValue());
    }
}