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


}
