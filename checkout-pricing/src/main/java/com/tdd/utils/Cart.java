package com.tdd.utils;

import com.tdd.PricingRules;
import com.tdd.tracing.debug.CartItem;
import com.tdd.tracing.debug.CartSnapshot;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.collectingAndThen;
import static java.util.stream.Collectors.counting;

public class Cart {
    private final CartSnapshot cart;
    private final List<String> items = new ArrayList<>();
    private final CartCreator creator;
    private final CartMerger merger;

    public Cart(PricingRules rules, CartSnapshot initialCart) {
        creator = new CartCreator(rules);
        merger = new CartMerger(rules);
        cart = initialCart;
    }

    public void add(String unit) {
        items.add(unit);
    }

    public CartSnapshot getCart() {
        if(cart.getItems().isEmpty()) {
            addCart();
        }
        else {
            List<CartItem> mergedItems = merger.mergeCart(cart, countItems());
            cart.setItems(mergedItems);
        }

        return cart;
    }

    private void addCart() {
        List<CartItem> cartItems = creator.createCart(countItems());
        cart.setItems(cartItems);
    }

    private Map<String, Integer> countItems() {
        return items.stream()
                .collect(Collectors.groupingBy(sku -> sku, collectingAndThen(counting(), Long::intValue)));
    }
}
