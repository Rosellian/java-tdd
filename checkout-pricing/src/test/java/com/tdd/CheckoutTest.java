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

        rules.addBuyXGetYFree("A", 1, 1, true);

        Checkout checkout = new Checkout(rules);

        checkout.scan("A");
        checkout.scan("A");

        assertEquals(50, checkout.total());
    }

    @Test
    void appliesBuyOneGetOneFreeForMultiplePairs() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);

        rules.addBuyXGetYFree("A", 1, 1, true);

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
        rules.addBuyXGetYFree("A", 1, 1, true);

        Checkout checkout = new Checkout(rules);

        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");

        assertEquals(100, checkout.total());
    }

    // This version uses priority between pricing rules and stackability rules
    //!Important! Here BuyXGetYFree is set as not stackable for product A
    @Test
    void choosesOptimalCombinationBetweenBuyXGetYFreeAndSpecialPrices() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);

        // Two conflicting rules
        rules.addBuyXGetYFree("A", 1, 1, false); // 2 for 50 In this case set as non-stackable
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

    @Test
    void buyOneGetOneFreeIsStackableForA() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);

        // A is stackable
        rules.addBuyXGetYFree("A", 1, 1, true);

        Checkout checkout = new Checkout(rules);

        // 4 A → two packets → 100 kr
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");

        assertEquals(100, checkout.total());
    }

    @Test
    void buyOneGetOneFreeIsNotStackableForB() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("B", 40);

        // B is non-stackable
        rules.addBuyXGetYFree("B", 1, 1, false);

        Checkout checkout = new Checkout(rules);

        // 4 B → 1 packets (2 for 40) + 2×40 = 120
        checkout.scan("B");
        checkout.scan("B");
        checkout.scan("B");
        checkout.scan("B");

        assertEquals(120, checkout.total());
    }

    @Test
    void stackabilityIsPerSku() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);
        rules.addUnitPrice("B", 40);

        rules.addBuyXGetYFree("A", 1, 1, true);   // A stackable
        rules.addBuyXGetYFree("B", 1, 1, false);  // B non-stackable

        Checkout checkout = new Checkout(rules);

        // 4 A → stackable → 100
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");

        // 4 B → non-stackable → 120
        checkout.scan("B");
        checkout.scan("B");
        checkout.scan("B");
        checkout.scan("B");

        assertEquals(220, checkout.total());
    }
}
