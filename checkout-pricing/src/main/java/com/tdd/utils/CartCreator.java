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

    public List<CartItem> createCart(Map<String, Integer> numberPerSku) {
        return numberPerSku.entrySet().stream()
                .map(this::toCartItem)
                .collect(toList());
    }

    private CartItem toCartItem(Map.Entry<String, Integer> item) {
        String sku = item.getKey();
        double unitPrice = rules.getUnitPrice(sku);

        return CartItem.from(sku, item.getValue(), unitPrice);
    }
}
