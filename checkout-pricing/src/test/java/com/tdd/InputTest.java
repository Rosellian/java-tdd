package com.tdd;

import com.tdd.api.samples.SKUs;
import com.tdd.rulesets.StandardUnitPrices;
import com.tdd.tracing.debug.CartItem;
import com.tdd.tracing.debug.CartSnapshot;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class InputTest {

    @Test
    void sameSet() {
        PricingRules rules = StandardUnitPrices.build();

        Checkout checkout = new Checkout(rules, createCart());
        checkout.scan("B");
        checkout.scan("A");

        assertEquals(180, checkout.total());
    }

    @Test
    void largerInitialSet() {
        PricingRules rules = StandardUnitPrices.build();
        CartSnapshot cart = CartSnapshot.from(createLargerCartItems());

        Checkout checkout = new Checkout(rules, cart);
        checkout.scan("B");
        checkout.scan("A");

        assertEquals(205, checkout.total());
    }

    @Test
    void largerAddedSet() {
        PricingRules rules = StandardUnitPrices.build();

        Checkout checkout = new Checkout(rules, createCart());
        checkout.scan("B");
        checkout.scan("A");
        checkout.scan("C");

        assertEquals(205, checkout.total());
    }

    private CartSnapshot createCart() {
        return CartSnapshot.from(createCartItems());
    }

    private List<CartItem> createLargerCartItems() {
        return List.of(CartItem.from(SKUs.A, 1),
                CartItem.from(SKUs.B, 1),
                CartItem.from(SKUs.C, 1));
    }

    private List<CartItem> createCartItems() {
        return List.of(CartItem.from(SKUs.A, 1),
                CartItem.from(SKUs.B, 1));
    }
}
