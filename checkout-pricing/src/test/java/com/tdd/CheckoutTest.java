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

    @Test
    void appliesThreeFor130SpecialPrice() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);
        rules.addSpecialPrice("A", 3, 130);

        Checkout checkout = new Checkout(rules);
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");

        assertEquals(130, checkout.total());
    }

    @Test
    void appliesTwoFor45SpecialPrice() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("B", 30);
        rules.addSpecialPrice("B", 2, 45);

        Checkout checkout = new Checkout(rules);
        checkout.scan("B");
        checkout.scan("B");

        assertEquals(45, checkout.total());
    }

    @Test
    void calculatesTotalForMixedProductsWithSpecialPrices() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);
        rules.addSpecialPrice("A", 3, 130);

        rules.addUnitPrice("B", 30);
        rules.addSpecialPrice("B", 2, 45);

        Checkout checkout = new Checkout(rules);

        checkout.scan("A");
        checkout.scan("B");
        checkout.scan("A");
        checkout.scan("B");
        checkout.scan("A");

        assertEquals(175, checkout.total());
    }

    @Test
    void scanningOrderDoesNotAffectTotal() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);
        rules.addSpecialPrice("A", 3, 130);

        rules.addUnitPrice("B", 30);
        rules.addSpecialPrice("B", 2, 45);

        Checkout checkout = new Checkout(rules);

        checkout.scan("B");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("B");
        checkout.scan("A");

        assertEquals(175, checkout.total());
    }

    @Test
    void calculatesTotalForMixedProductsWithAndWithoutSpecialPrices() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);
        rules.addSpecialPrice("A", 3, 130);

        rules.addUnitPrice("B", 30);
        rules.addSpecialPrice("B", 2, 45);

        rules.addUnitPrice("C", 20);
        rules.addUnitPrice("D", 15);

        Checkout checkout = new Checkout(rules);

        checkout.scan("A");
        checkout.scan("B");
        checkout.scan("C");
        checkout.scan("A");
        checkout.scan("D");
        checkout.scan("B");
        checkout.scan("A");

        assertEquals(210, checkout.total());
    }

    @Test
    void appliesBestSpecialPriceWhenMultipleSpecialPricesExist() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);

        rules.addSpecialPrice("A", 3, 130);
        rules.addSpecialPrice("A", 5, 200);

        Checkout checkout = new Checkout(rules);

        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");

        assertEquals(200, checkout.total());
    }

    @Test
    void combinesMultipleSpecialPricesToGetBestTotal() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);

        rules.addSpecialPrice("A", 3, 130);
        rules.addSpecialPrice("A", 5, 200);

        Checkout checkout = new Checkout(rules);

        // 8 items
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");

        assertEquals(330, checkout.total());
    }

    @Test
    void choosesBestCombinationWhenSpecialPricesConflict() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);

        rules.addSpecialPrice("A", 3, 120);
        rules.addSpecialPrice("A", 2, 80);

        Checkout checkout = new Checkout(rules);

        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");

        assertEquals(160, checkout.total());
    }

    @Test
    void appliesBuyOneGetOneFree() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);

        rules.addBuyXGetYFree("A", 1, 1);

        Checkout checkout = new Checkout(rules);

        checkout.scan("A");
        checkout.scan("A");

        assertEquals(50, checkout.total());
    }

    @Test
    void appliesBuyOneGetOneFreeForMultiplePairs() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);

        rules.addBuyXGetYFree("A", 1, 1);

        Checkout checkout = new Checkout(rules);

        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");

        assertEquals(100, checkout.total());
    }

    @Test
    void choosesBestPriceAcrossDifferentRuleTypes() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);

        rules.addSpecialPrice("A", 3, 130);
        rules.addBuyXGetYFree("A", 1, 1);

        Checkout checkout = new Checkout(rules);

        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");

        assertEquals(100, checkout.total());
    }

    // This version uses priority between pricing rules and stackability rules
    @Test
    void choosesOptimalCombinationBetweenBuyXGetYFreeAndSpecialPrices() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);

        // Two conflicting rules
        rules.addBuyXGetYFree("A", 1, 1); // 2 for 50
        rules.addSpecialPrice("A", 3, 100); // 3 for 100

        Checkout checkout;

        // Case 1: 3 items → best is 3-for-100
        checkout = new Checkout(rules);
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        assertEquals(100, checkout.total());

        // Case 2: 4 items → best is 3-for-100 + 1×50 = 150
        checkout = new Checkout(rules);
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        assertEquals(150, checkout.total());

        // Case 3: 5 items → best is 3-for-100 + buy-1-get-1-free = 150
        checkout = new Checkout(rules);
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        assertEquals(150, checkout.total());

        // Case 4: 6 items → best is 3-for-100 + 3-for-100 = 200
        checkout = new Checkout(rules);
        for (int i = 0; i < 6; i++) checkout.scan("A");
        assertEquals(200, checkout.total());
    }
}
