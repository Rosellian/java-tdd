package com.tdd.rulesets.simple;

import com.tdd.PricingRules;
import com.tdd.api.samples.Ruleset;

public class FreeRules implements Ruleset {

    public static PricingRules buy1Get1Free() {
        return buy1Get1Free(true);
    }

    public static PricingRules buy1Get1Free(boolean stackable) {
        return buy1Get1Free("A", stackable);
    }

    public static PricingRules buy1Get1Free(String sku, boolean stackable) {
        return buy1Get1Free(sku, 50, stackable);
    }

    public static PricingRules buy1Get1Free(String sku, double price, boolean stackable) {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice(sku, price);

        rules.addBuyXGetYFree(sku, 1, 1, 2, stackable);
        return rules;
    }

    public static PricingRules buy1Get1FreeTwoSkus() {
        PricingRules rules = new PricingRules(DEFAULT_UNIT_PRICES);

        rules.addBuyXGetYFree("A", 1, 1, 2, true);
        rules.addBuyXGetYFree("B", 1, 1, 2, false);

        return rules;
    }
}
