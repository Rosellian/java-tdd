package com.tdd;

import com.tdd.rules.CrossSkuRule;
import com.tdd.rules.PricingOption;
import com.tdd.rules.SkuDiscount;

import java.util.Comparator;
import java.util.List;

public class RuleEngine {
    private final PricingRules rules;

    public RuleEngine(PricingRules rules) {
        this.rules = rules;
    }

    public List<CrossSkuRule> getOrderedCrossSkuRules() {
        return rules.getCrossSkuRules().stream()
                .sorted(Comparator.comparingInt(CrossSkuRule::priority))
                .toList();
    }

    public List<SkuDiscount> getSkuDiscounts() {return rules.getSkuDiscounts();}

    public List<PricingOption> getPricingOptions(String sku) {
        return rules.getPricingOptions(sku);
    }
}
