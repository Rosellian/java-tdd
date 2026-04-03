package com.tdd.rulesets;

import com.tdd.PricingRules;

import static com.tdd.rulesets.simple.CrossDiscountRules.buy2AGet1BDiscount;
import static com.tdd.rulesets.simple.CrossFreeRules.buy2AGet1BFree;
import static com.tdd.rulesets.simple.FreeRules.buy1Get1Free;

public class SimpleRulesets {

    public static PricingRules buy1Get1FreeAndSpecial(boolean freeStackable, int specialPrice) {
        PricingRules rules = buy1Get1Free("A", freeStackable);
        rules.addSpecialPrice("A", 3, specialPrice,1, true);

        return rules;
    }

    public static PricingRules crossDiscountAndSpecialPrice(int specialQuantity, int specialPrice) {
        PricingRules rules = buy2AGet1BDiscount(0.5, 0, false);
        rules.addSpecialPrice("B", specialQuantity, specialPrice, 1, true);

        return rules;
    }

    public static PricingRules crossDiscountAndFree(int discountPriority, int freePriority) {
        PricingRules rules = buy2AGet1BDiscount(0.5, discountPriority, false);
        rules.addCrossSkuBuyXGetYFree("A", 2, "B", 1,
                freePriority, false);

        return rules;
    }

    public static PricingRules crossFreeAndBetterFree(int priority, int betterPriority) {
        PricingRules rules = buy2AGet1BFree(priority, true);
        rules.addCrossSkuBuyXGetYFree("A", 3, "B", 1,
                betterPriority, true);

        return rules;
    }

    public static PricingRules crossDiscountAndSkuDiscount(int crossPriority, int skuPriority) {
        PricingRules rules = buy2AGet1BDiscount(0.5,  crossPriority, false);
        rules.addSkuDiscount("B", 0.25, skuPriority);

        return rules;
    }
}
