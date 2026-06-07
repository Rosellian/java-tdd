package com.tdd.rulesets.simple;

import com.tdd.PricingRules;
import com.tdd.api.samples.SampleRulesBuilder;

public class DiscountRules implements SampleRulesBuilder {

    private DiscountRules() {}

    public static PricingRules buy1Get1Discount(double discount) {
        PricingRules rules = new PricingRules(DEFAULT_UNIT_PRICES);

        rules.addBuyXGetYDiscount("A", 2, 1, discount, 1, false);

        return rules;
    }
}
