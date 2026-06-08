package com.tdd.utils;

import com.tdd.tracing.debug.CartItem;
import com.tdd.tracing.debug.CartSnapshot;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class CartMerger {

    private CartMerger() {}

    public static List<CartItem> mergeCart(CartSnapshot cart, Map<String, Integer> itemsPerSku) {
        Map<String, Integer> merged = new LinkedHashMap<>();

        addInitialCart(cart, itemsPerSku, merged);

        addScannedItems(itemsPerSku, merged);

        return merged.entrySet().stream()
                .map(CartMerger::toCartItem)
                .toList();
    }

    private static void addScannedItems(Map<String, Integer> itemsPerSku, Map<String, Integer> merged) {
        for (var e : itemsPerSku.entrySet()) {
            merged.putIfAbsent(e.getKey(), e.getValue());
        }
    }

    private static void addInitialCart(CartSnapshot cart, Map<String, Integer> itemsPerSku,
                                       Map<String, Integer> merged) {
        for (CartItem item : cart.items()) {
            String sku = item.sku();

            int newQuantity = item.quantity() + itemsPerSku.getOrDefault(sku, 0);

            merged.put(sku, newQuantity);
        }
    }

    private static CartItem toCartItem(Map.Entry<String, Integer> entry) {
        return CartItem.from(entry.getKey(), entry.getValue());
    }
}
