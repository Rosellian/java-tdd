package com.tdd.utils;

import com.tdd.tracing.debug.CartItem;
import com.tdd.tracing.debug.CartSnapshot;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.tdd.tracing.debug.CartSnapshot.from;
import static com.tdd.utils.CartCreator.createCart;
import static com.tdd.utils.CartMerger.mergeCart;
import static java.util.stream.Collectors.*;

public class Cart {
    private CartSnapshot cart;
    private final List<String> items = new ArrayList<>();

    public Cart(CartSnapshot initialCart) {
        cart = initialCart;
    }

    public void add(String unit) {
        items.add(unit);
    }

    public CartSnapshot getCart() {
        if(cart.items().isEmpty()) {
            newCart();
        }
        else {
            updateCart();
        }

        return cart;
    }

    private void newCart() {
        List<CartItem> cartItems = createCart(countItems());
        cart = from(cart, cartItems);
    }

    private void updateCart() {
        List<CartItem> mergedItems = mergeCart(cart, countItems());
        cart = from(cart, mergedItems);
    }

    private Map<String, Integer> countItems() {
        return items.stream()
                .collect(groupingBy(sku -> sku, collectingAndThen(counting(), Long::intValue)));
    }
}
