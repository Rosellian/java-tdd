package com.tdd;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestUtils {

    private TestUtils() {}

    public static void testForA(PricingRules rules, int n, double expected) {
        Checkout checkout = new Checkout(rules);
        scanProduct(checkout, "A", n);
        assertEquals(expected, checkout.total());
    }

    public static void scanStandardInput(Checkout checkout) {
        scanProduct(checkout, "A", 5);
        scanProduct(checkout, "B", 4);
        scanProduct(checkout, "C", 3);
        scanProduct(checkout, "D", 2);
        scanProduct(checkout, "E", 1);
    }

    public static void scanProduct(Checkout checkout, String sku, int n) {
        for(int i = 0; i < n; i++) {
            checkout.scan(sku);
        }
    }
}
