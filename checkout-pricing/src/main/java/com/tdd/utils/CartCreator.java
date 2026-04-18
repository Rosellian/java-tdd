package com.tdd.utils;

import com.tdd.PricingRules;
import com.tdd.tracing.debug.CartItem;

import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

public class CartCreator {
    private final PricingRules rules;

    public CartCreator(PricingRules rules) {
        this.rules = rules;
    }

    public List<CartItem> createCart(Map<String, Long> numberPerSku) {
        return numberPerSku.entrySet().stream()
                .map(this::toCartItem)
                .collect(toList());
    }

    private CartItem toCartItem(Map.Entry<String, Long> item) {
        String sku = item.getKey();
        int quantity = item.getValue().intValue();
        int unitPrice = rules.getUnitPrice(sku);

        return CartItem.from(sku, quantity, unitPrice);
    }
}
