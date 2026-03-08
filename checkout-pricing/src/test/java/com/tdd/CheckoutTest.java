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
        rules.addSpecialPrice("A", 3, 130, 1, true);

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
        rules.addSpecialPrice("B", 2, 45,1, true);

        Checkout checkout = new Checkout(rules);
        checkout.scan("B");
        checkout.scan("B");

        assertEquals(45, checkout.total());
    }

    @Test
    void calculatesTotalForMixedProductsWithSpecialPrices() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);
        rules.addSpecialPrice("A", 3, 130,1, true);

        rules.addUnitPrice("B", 30);
        rules.addSpecialPrice("B", 2, 45,1, true);

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
        rules.addSpecialPrice("A", 3, 130,1, true);

        rules.addUnitPrice("B", 30);
        rules.addSpecialPrice("B", 2, 45,1, true);

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
        rules.addSpecialPrice("A", 3, 130,1, true);

        rules.addUnitPrice("B", 30);
        rules.addSpecialPrice("B", 2, 45,1, true);

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

        rules.addSpecialPrice("A", 3, 130,1, true);
        rules.addSpecialPrice("A", 5, 200,1, true);

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

        rules.addSpecialPrice("A", 3, 130,1, true);
        rules.addSpecialPrice("A", 5, 200,1, true);

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

        rules.addSpecialPrice("A", 3, 120,1, true);
        rules.addSpecialPrice("A", 2, 80,1, true);

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

        rules.addSpecialPrice("A", 3, 130,1, true);
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
        rules.addSpecialPrice("A", 3, 100,1, true); // 3 for 100

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

    @Test
    void appliesBuyTwoGetOneHalfPrice() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);

        // buy 2, get 1 at 50% discount
        rules.addBuyXGetYDiscount("A", 2, 1, 0.5);

        Checkout checkout = new Checkout(rules);

        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");

        assertEquals(125, checkout.total());
    }

    @Test
    void combinesAllRuleTypesWithPriorityAndStackability() {
        PricingRules rules = new PricingRules();

        // --- SKU A ---
        // unit price
        rules.addUnitPrice("A", 50);
        // special price: 3 for 120 (priority 1, stackable)
        rules.addSpecialPrice("A", 3, 120,1, true);
        // buy 1, get 1 free (stackable)
        rules.addBuyXGetYFree("A", 2, 1, true);

        // --- SKU B ---
        rules.addUnitPrice("B", 40);
        // special price: 2 for 70 (priority 1)
        rules.addSpecialPrice("B", 2, 70,1, true);
        // buy 1, get 1 free (non-stackable)
        rules.addBuyXGetYFree("B", 1, 1, false);

        // --- SKU C ---
        rules.addUnitPrice("C", 30);
        // buy 2, get 1 at 50% discount (stackable)
        rules.addBuyXGetYDiscount("C", 2, 1, 0.5);

        Checkout checkout = new Checkout(rules);

        // --- Basket ---
        // A: 6 items
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");

        // B: 4 items
        checkout.scan("B");
        checkout.scan("B");
        checkout.scan("B");
        checkout.scan("B");

        // C: 5 items
        checkout.scan("C");
        checkout.scan("C");
        checkout.scan("C");
        checkout.scan("C");
        checkout.scan("C");

        // --- Expected ---
        // A:
        // best is 3-for-120 + 3-for-120 = 240
        //
        // B:
        // non-stackable buy-1-get-1-free:
        // 1 package (2 for 40) + 2×40 = 120
        //
        // C:
        // buy 2, get 1 half price (stackable):
        // group1: 30 + 30 + 15 = 75
        // 5 items → 2 leftover at 30
        // total C = 75 + 2*30 = 135
        //
        // TOTAL = 240 + 120 + 135 = 445

        assertEquals(445, checkout.total());
    }

    @Test
    void buyTwoAGetOneBFree() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);
        rules.addUnitPrice("B", 40);

        rules.addCrossSkuBuyXGetYFree("A", 2, "B", 1, 0, true);

        Checkout checkout = new Checkout(rules);

        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("B");

        assertEquals(100, checkout.total());
    }

    @Test
    void crossSkuStackable() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);
        rules.addUnitPrice("B", 40);

        rules.addCrossSkuBuyXGetYFree("A", 2, "B", 1, 0, true);

        Checkout checkout = new Checkout(rules);

        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("B");
        checkout.scan("B");

        // 4 A = 200
        // 2 B = free
        assertEquals(200, checkout.total());
    }

    @Test
    void crossSkuNonStackable() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);
        rules.addUnitPrice("B", 40);

        rules.addCrossSkuBuyXGetYFree("A", 2, "B", 1, 0, false);

        Checkout checkout = new Checkout(rules);

        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("B");
        checkout.scan("B");

        // 4 A = 200
        // 1 B free, 1 B paid = 40
        assertEquals(240, checkout.total());
    }

    @Test
    void crossSkuBeatsSpecialPriceWhenHigherPriority() {
        PricingRules rules = new PricingRules();

        // --- SKU A ---
        rules.addUnitPrice("A", 50);
        rules.addSpecialPrice("A", 3, 120, 1, true);

        // --- SKU B ---
        rules.addUnitPrice("B", 40);
        rules.addSpecialPrice("B", 2, 70, 1, true);

        // --- Cross-SKU ---
        // priority 0 = higher than special prices
        rules.addCrossSkuBuyXGetYFree("A", 2, "B", 1, 0, false);

        Checkout checkout = new Checkout(rules);

        // Basket: A A A B B
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("A");
        checkout.scan("B");
        checkout.scan("B");

        // Expected:
        // Cross-SKU: 1 B free
        // A: 3 → 120
        // B: 1 → 40
        // Total = 160

        assertEquals(160, checkout.total());
    }
}
