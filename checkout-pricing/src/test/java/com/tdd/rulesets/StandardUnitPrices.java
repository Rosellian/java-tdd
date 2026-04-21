package com.tdd.rulesets;

import com.tdd.PricingRules;
import com.tdd.api.samples.Ruleset;

public class StandardUnitPrices implements Ruleset {

    public static PricingRules build() {
        return new PricingRules(DEFAULT_UNIT_PRICES);
    }
}
