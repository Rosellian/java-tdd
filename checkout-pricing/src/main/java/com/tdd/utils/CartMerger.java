package com.tdd.utils;

import com.tdd.PricingRules;
import com.tdd.tracing.debug.CartItem;
import com.tdd.tracing.debug.CartSnapshot;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class CartMerger {
    private final PricingRules rules;

    public CartMerger(PricingRules rules) {
        this.rules = rules;
    }

    public List<CartItem> mergeCart(CartSnapshot cart, Map<String, Integer> itemsPerSku) {
        Map<String, Integer> merged = new LinkedHashMap<>();

        addInitialCart(cart, itemsPerSku, merged);

        addScannedItems(itemsPerSku, merged);

        return merged.entrySet().stream()
                .map(this::toCartItem)
                .toList();
    }

    private void addScannedItems(Map<String, Integer> itemsPerSku, Map<String, Integer> merged) {
        for (var e : itemsPerSku.entrySet()) {
            merged.putIfAbsent(e.getKey(), e.getValue());
        }
    }

    private void addInitialCart(CartSnapshot cart, Map<String, Integer> itemsPerSku, Map<String, Integer> merged) {
        for (CartItem item : cart.getItems()) {
            int newQuantity = item.getQuantity() + itemsPerSku.getOrDefault(item.getSku(), 0);
            merged.put(item.getSku(), newQuantity);
        }
    }

    private CartItem toCartItem(Map.Entry<String, Integer> entry) {
        String sku = entry.getKey();

        return CartItem.from(sku, entry.getValue(), rules.getUnitPrice(sku));
    }
}
