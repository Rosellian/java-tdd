package com.tdd.utils;

import com.tdd.tracing.debug.CartItem;
import com.tdd.tracing.debug.CartSnapshot;

import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

public class CartMerger {

    public static List<CartItem> mergeCart(CartSnapshot cart, Map<String, Integer> itemsPerSku) {
        //TODO complete merge, add SKUs missing in original list (supporting initial cart with additions)

        return cart.getItems().stream()
                .map(item -> mergeSku(item, itemsPerSku))
                .collect(toList());
    }

    private static CartItem mergeSku(CartItem item, Map<String, Integer> itemsPerSku) {
        String sku = item.getSku();
        int newQuantity = itemsPerSku.getOrDefault(sku, 0);
        int mergedQuantity = item.getQuantity() + newQuantity;

        return CartItem.from(sku, mergedQuantity, item.getUnitPrice());
    }
}
