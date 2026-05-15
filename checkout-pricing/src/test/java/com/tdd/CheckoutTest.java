package com.tdd;

import com.tdd.api.samples.NoCrossNoSkuDiscount;
import com.tdd.rulesets.CrossSkuBeatsSpecialPriceWhenHigherPriority;
import org.junit.jupiter.api.Test;

import static com.tdd.TestUtils.scanProduct;
import static com.tdd.TestUtils.testForA;
import static com.tdd.rulesets.SimpleRulesets.*;
import static com.tdd.rulesets.simple.CrossDiscountRules.buy2AGet1BDiscount;
import static com.tdd.rulesets.simple.CrossFreeRules.buy2AGet1BFree;
import static com.tdd.rulesets.simple.DiscountRules.buy1Get1Discount;
import static com.tdd.rulesets.simple.FreeRules.buy1Get1Free;
import static com.tdd.rulesets.simple.FreeRules.buy1Get1FreeTwoSkus;
import static com.tdd.rulesets.simple.SpecialPrices.*;
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
        PricingRules rules = specialPrice("A", 50, 3, 130);

        Checkout checkout = new Checkout(rules);
        scanProduct(checkout, "A", 3);

        assertEquals(130, checkout.total());
    }

    @Test
    void appliesTwoFor45SpecialPrice() {
        PricingRules rules = specialPrice("B", 30, 2, 45);

        Checkout checkout = new Checkout(rules);
        scanProduct(checkout, "B", 2);

        assertEquals(45, checkout.total());
    }

    @Test
    void calculatesTotalForMixedProductsWithSpecialPrices() {
        PricingRules rules = twoSpecialPrices();

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
        PricingRules rules = twoSpecialPrices();

        Checkout checkout = new Checkout(rules);

        checkout.scan("B");
        scanProduct(checkout, "A", 2);
        checkout.scan("B");
        checkout.scan("A");

        assertEquals(175, checkout.total());
    }

    @Test
    void calculatesTotalForMixedProductsWithAndWithoutSpecialPrices() {
        PricingRules rules = twoSpecialPricesFourSkus();

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
        PricingRules rules = twoSpecialPricesSameSku();

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 5);

        assertEquals(200, checkout.total());
    }

    @Test
    void combinesMultipleSpecialPricesToGetBestTotal() {
        PricingRules rules = twoSpecialPricesSameSku();

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 8);

        assertEquals(330, checkout.total());
    }

    @Test
    void choosesBestCombinationWhenSpecialPricesConflict() {
        PricingRules rules = specialPriceConflict();

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 4);

        assertEquals(160, checkout.total());
    }

    @Test
    void appliesBuyOneGetOneFree() {
        PricingRules rules = buy1Get1Free();

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 2);

        assertEquals(50, checkout.total());
    }

    @Test
    void appliesBuyOneGetOneFreeForMultiplePairs() {
        PricingRules rules = buy1Get1Free();

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 4);

        assertEquals(100, checkout.total());
    }

    @Test
    void choosesBestPriceAcrossDifferentRuleTypes() {
        PricingRules rules = buy1Get1FreeAndSpecial(true, 130);

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 4);

        assertEquals(100, checkout.total());
    }

    // This version uses priority between pricing rules and stackability rules
    //!Important! Here BuyXGetYFree is set as not stackable for product A
    @Test
    void choosesOptimalCombinationBetweenBuyXGetYFreeAndSpecialPrices() {
        PricingRules rules = buy1Get1FreeAndSpecial(false, 100);

        // Case 1: 3 items → best is 3-for-100
        testForA(rules, 3, 100);

        // Case 2: 4 items → best is 3-for-100 + 1×50 = 150
        testForA(rules, 4, 150);

        // Case 3: 5 items → best is 3-for-100 + buy-1-get-1-free = 150
        testForA(rules, 5, 150);

        // Case 4: 6 items → best is 3-for-100 + 3-for-100 = 200
        testForA(rules, 6, 200);
    }

    @Test
    void buyOneGetOneFreeIsStackableForA() {
        PricingRules rules = buy1Get1Free();

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 4);

        assertEquals(100, checkout.total());
    }

    @Test
    void buyOneGetOneFreeIsNotStackableForB() {
        PricingRules rules = buy1Get1Free("B", 40, false);

        Checkout checkout = new Checkout(rules);

        // 4 B → 1 packets (2 for 40) + 2×40 = 120
        scanProduct(checkout, "B", 4);

        assertEquals(120, checkout.total());
    }

    @Test
    void stackabilityIsPerSku() {
        PricingRules rules = buy1Get1FreeTwoSkus();

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 4);
        scanProduct(checkout, "B", 4);

        assertEquals(220, checkout.total());
    }

    @Test
    void appliesBuyTwoGetOneHalfPrice() {
        PricingRules rules = buy1Get1Discount(0.5);

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 3);

        assertEquals(125, checkout.total());
    }

    //TODO Rule decision needed!
    @Test
    void combinesAllRuleTypesWithPriorityAndStackability() {
        PricingRules rules = NoCrossNoSkuDiscount.build();

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 6);
        scanProduct(checkout, "B", 4);
        scanProduct(checkout, "C", 5);

        assertEquals(445, checkout.total());
        // --- Expected ---
        // A:
        // best is 3-for-120 + 3-for-120 = 240
        // or stackable buy-2-get-1-free:
        // 2 package (3 for 100) = 200
        //
        // B:
        // non-stackable buy-1-get-1-free:
        // 1 package (2 for 40) + 2×40 = 120
        // or
        // non-stackable buy-1-get-1-free, 2-for-70:
        // 1 package (2 for 40) + 1 package (2-for-70) = 110
        //
        // C:
        // buy 2, get 1 half price (stackable):
        // group1: 30 + 30 + 15 = 75
        // 5 items → 2 leftover at 30
        // total C = 75 + 2*30 = 135
        //
        // TOTAL = 240 + 120 + 135
        // or
        // 200 + 110 + 135
        // = ???(445)
    }

    @Test
    void buyTwoAGetOneBFree() {
        PricingRules rules = buy2AGet1BFree();

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 2);
        checkout.scan("B");

        assertEquals(100, checkout.total());
    }

    @Test
    void crossSkuStackable() {
        PricingRules rules = buy2AGet1BFree();

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 4);
        scanProduct(checkout, "B", 2);

        // 4 A = 200
        // 2 B = free
        assertEquals(200, checkout.total());
    }

    @Test
    void crossSkuNonStackable() {
        PricingRules rules = buy2AGet1BFree(0, false);

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 4);
        scanProduct(checkout, "B", 2);

        // 4 A = 200
        // 1 B free, 1 B paid = 40
        assertEquals(240, checkout.total());
    }

    @Test
    void crossSkuBeatsSpecialPriceWhenHigherPriority() {
        PricingRules rules = CrossSkuBeatsSpecialPriceWhenHigherPriority.build();

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 3);
        scanProduct(checkout, "B", 2);

        // Expected:
        // Cross-SKU: 1 B free
        // A: 3 → 120
        // B: 1 → 40
        // Total = 160
        assertEquals(160, checkout.total());
    }

    @Test
    void crossSkuBuyXGetYAtDiscount() {
        PricingRules rules = buy2AGet1BDiscount(0.5);

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 2);
        checkout.scan("B");

        // Expected:
        // A: 50 + 50 = 100
        // B: 40 * 0.5 = 20
        // Total = 120
        assertEquals(120, checkout.total());
    }

    @Test
    void crossSkuDiscountBeatsSpecialPriceWhenHigherPriority() {
        PricingRules rules = crossDiscountAndSpecialPrice(2, 70);

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 2);
        scanProduct(checkout, "B", 2);

        // Expected:
        // Cross-SKU: 1 B at 20 kr
        // Remaining B: 1 at 40 kr
        // A: 100
        // Total = 160
        assertEquals(160, checkout.total());
    }

    @Test
    void crossSkuFreeBeatsDiscountWhenHigherPriority() {
        PricingRules rules = crossDiscountAndFree(1, 0);

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 2);
        checkout.scan("B");

        assertEquals(100, checkout.total());
    }

    @Test
    void crossSkuDiscountBeatsFreeWhenHigherPriority() {
        PricingRules rules = crossDiscountAndFree(0, 1);

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 2);
        checkout.scan("B");

        assertEquals(120, checkout.total());
    }

    @Test
    void crossSkuDiscountAndSpecialPriceCombinedOptimization() {
        PricingRules rules = crossDiscountAndSpecialPrice(3, 90);

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 2);
        scanProduct(checkout, "B", 3);

        // Expected:
        // Cross-SKU: 1 B at 20 kr
        // Remaining B: 2 × 40 = 80
        // A: 100
        // Total = 200
        assertEquals(200, checkout.total());
    }

    @Test
    void higherPriorityFreeRuleWinsWhenBothAreStackable() {
        PricingRules rules = crossFreeAndBetterFree(0, 1);

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 6);
        scanProduct(checkout, "B", 2);

        // Expected:
        // Rule 1 applies 3 times → 3 free B, but only 2 exist → 2 free
        // A = 300
        // B = 0
        assertEquals(300, checkout.total());
    }

    @Test
    void higherPriorityFreeRuleWinsEvenIfLowerPriorityIsMoreGenerous() {
        PricingRules rules = crossFreeAndBetterFree(1, 0);

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 6);
        scanProduct(checkout, "B", 2);

        // Expected:
        // Rule 1 applies twice → 2 free B
        // Rule 2 ignored
        assertEquals(300, checkout.total());
    }

    @Test
    void crossSkuDiscountBeatsSkuDiscountWhenHigherPriority() {
        PricingRules rules = crossDiscountAndSkuDiscount(0, 1);

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 2);
        checkout.scan("B");

        assertEquals(120, checkout.total());
    }

    @Test
    void skuDiscountBeatsCrossSkuDiscountWhenHigherPriority() {
        PricingRules rules = crossDiscountAndSkuDiscount(1, 0);

        Checkout checkout = new Checkout(rules);

        scanProduct(checkout, "A", 2);
        checkout.scan("B");

        assertEquals(130, checkout.total());
    }
}
