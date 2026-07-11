package com.tdd.tracing.debug;

import java.util.List;
import java.util.Map;

public record CartSnapshot(
        List<CartItem> items,
        CustomerInfo customer,
        Map<String, Object> context
) {

    public static CartSnapshot from(List<CartItem> items) {
        return new CartSnapshot(items, null, null);
    }

    //TODO Maybe change signature or incorporate merge logic to avoid confusion
    public static CartSnapshot from(CartSnapshot original, List<CartItem> items) {
        return new CartSnapshot(items, original.customer, original.context);
    }
}