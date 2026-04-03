package com.tdd.rulesets.simple;

import com.tdd.PricingRules;
import com.tdd.api.samples.Ruleset;

public class DiscountRules implements Ruleset {

    public static PricingRules buy1Get1Discount(double discount) {
        PricingRules rules = new PricingRules(DEFAULT_UNIT_PRICES);

        rules.addBuyXGetYDiscount("A", 2, 1, discount, 1, false);

        return rules;
    }
}
