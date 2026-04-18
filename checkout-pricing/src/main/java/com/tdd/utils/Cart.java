package com.tdd.utils;

import com.tdd.PricingRules;
import com.tdd.tracing.debug.CartItem;
import com.tdd.tracing.debug.CartSnapshot;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.tdd.utils.CartMerger.mergeCart;

public class Cart {
    private final CartSnapshot cart;
    private final List<String> items = new ArrayList<>();
    private final CartCreator cartCreator;

    public Cart(PricingRules rules, CartSnapshot initialCart) {
        cartCreator = new CartCreator(rules);
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
            mergeCart(cart, countItems());
        }

        return cart;
    }

    private void addCart() {
        List<CartItem> cartItems = cartCreator.createCart(countItems());
        cart.setItems(cartItems);
    }

    private Map<String, Long> countItems() {
        return items.stream()
                .collect(Collectors.groupingBy(sku -> sku, Collectors.counting()));
    }
}
