package com.tdd.tracing.debug;

import com.tdd.api.samples.SKUs;

public record CartItem(
        String sku,
        int quantity
) {

    public static CartItem from(String sku, int quantity) {
        return new CartItem(sku, quantity);
    }

    public static CartItem from(SKUs sku, int quantity) {
        return from(sku.name(), quantity);
    }
}