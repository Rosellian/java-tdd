package com.tdd.rulesets;

import com.tdd.PricingRules;
import com.tdd.api.samples.SampleRulesBuilder;

public class StandardUnitPrices implements SampleRulesBuilder {

    public static PricingRules build() {
        return new PricingRules(DEFAULT_UNIT_PRICES);
    }
}
