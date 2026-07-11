package com.tdd.utils;

import com.tdd.tracing.debug.CartItem;

import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

public class CartCreator {

    private CartCreator() {}

    public static List<CartItem> createCart(Map<String, Integer> numberPerSku) {
        return numberPerSku.entrySet().stream()
                .map(CartCreator::toCartItem)
                .collect(toList());
    }

    private static CartItem toCartItem(Map.Entry<String, Integer> item) {
        return CartItem.from(item.getKey(), item.getValue());
    }
}
