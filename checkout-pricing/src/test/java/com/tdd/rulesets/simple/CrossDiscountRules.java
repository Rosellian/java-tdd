package com.tdd.rulesets.simple;

import com.tdd.PricingRules;
import com.tdd.api.samples.SampleRulesBuilder;

public class CrossDiscountRules implements SampleRulesBuilder {

    private CrossDiscountRules() {}

    public static PricingRules buy2AGet1BDiscount(double discount) {
        return buy2AGet1BDiscount(discount, 0, true);
    }

    public static PricingRules buy2AGet1BDiscount(double discount, int priority, boolean stackable) {
        PricingRules rules = new PricingRules(DEFAULT_UNIT_PRICES);

        rules.addCrossSkuBuyXGetYDiscount("A", 2,
                "B", 1, discount, priority, stackable);

        return rules;
    }
}
