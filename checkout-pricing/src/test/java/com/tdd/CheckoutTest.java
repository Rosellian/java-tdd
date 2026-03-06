package com.tdd;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CheckoutTest {

    @Test
    void scanningSingleItemReturnsItsPrice() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);

        Checkout checkout = new Checkout(rules);
        checkout.scan("A");

        assertEquals(50, checkout.total());
    }
}
