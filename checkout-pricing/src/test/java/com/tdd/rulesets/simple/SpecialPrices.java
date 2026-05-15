package com.tdd.rulesets.simple;

import com.tdd.PricingRules;
import com.tdd.api.samples.SampleRulesBuilder;

public class SpecialPrices implements SampleRulesBuilder {

    public static PricingRules specialPrice(String sku, double unitPrice, int quantity, double price) {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice(sku, unitPrice);
        rules.addSpecialPrice(sku, quantity, price, 1, true);

        return rules;
    }

    public static PricingRules twoSpecialPrices() {
        PricingRules rules = new PricingRules();
        rules.addUnitPrice("A", 50);
        rules.addSpecialPrice("A", 3, 130,1, true);

        rules.addUnitPrice("B", 30);
        rules.addSpecialPrice("B", 2, 45,1, true);

        return rules;
    }

    public static PricingRules twoSpecialPricesFourSkus() {
        PricingRules rules = twoSpecialPrices();
        rules.addUnitPrice("C", 20);
        rules.addUnitPrice("D", 15);

        return rules;
    }

    public static PricingRules twoSpecialPricesSameSku() {
        PricingRules rules = new PricingRules(DEFAULT_UNIT_PRICES);

        rules.addSpecialPrice("A", 3, 130,1, true);
        rules.addSpecialPrice("A", 5, 200,1, true);

        return rules;
    }

    public static PricingRules specialPriceConflict() {
        PricingRules rules = new PricingRules(DEFAULT_UNIT_PRICES);

        rules.addSpecialPrice("A", 3, 120,1, true);
        rules.addSpecialPrice("A", 2, 80,1, true);
        return rules;
    }
}
