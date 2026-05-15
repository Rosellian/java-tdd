package com.tdd.rulesets.simple;

import com.tdd.PricingRules;
import com.tdd.api.samples.SampleRulesBuilder;

public class CrossFreeRules implements SampleRulesBuilder {

    public static PricingRules buy2AGet1BFree() {
        return buy2AGet1BFree(0, true);
    }
    public static PricingRules buy2AGet1BFree(int priority, boolean stackable) {
        PricingRules rules = new PricingRules(DEFAULT_UNIT_PRICES);

        rules.addCrossSkuBuyXGetYFree("A", 2, "B", 1, priority, stackable);

        return rules;
    }
}
