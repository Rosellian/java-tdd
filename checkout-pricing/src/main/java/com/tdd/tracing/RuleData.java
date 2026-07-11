package com.tdd.tracing;

import com.tdd.rules.PricingOption;

public record RuleData(
        String name,
        String data
) {
    public static RuleData from(PricingOption pricingOption) {
        return new RuleData(pricingOption.name(), pricingOption.toString());
    }
}
