package com.tdd;

import com.tdd.rules.*;

import java.util.*;
import java.util.stream.Collectors;

public class Checkout {
    private final RuleEngine ruleEngine;
    private final RuleEvaluator ruleEvaluator;
    private final PriceCalculator calculator;

    private final List<String> items = new ArrayList<>();

    public Checkout(PricingRules rules) {
        ruleEngine = new RuleEngine(rules);
        ruleEvaluator = new RuleEvaluator(rules);
        calculator = new PriceCalculator(rules);
    }

    public void scan(String unit) {
        items.add(unit);
    }

    public int total() {
        Map<String, Long> counts = countItems();

        Map<String, SkuMod> mods = new HashMap<>();

        applyCrossSkuRules(counts, mods);

        applySkuDiscount(mods);

        return calculator.calculateTotal(counts, mods);
    }

    private Map<String, Long> countItems() {
        return items.stream()
                .collect(Collectors.groupingBy(sku -> sku, Collectors.counting()));
    }

    private void applyCrossSkuRules(Map<String, Long> counts, Map<String, SkuMod> mods) {
        for (var rule : ruleEngine.getOrderedCrossSkuRules()) {
            boolean applied = switch(rule) {
                case CrossSkuBuyXGetYFree free -> ruleEvaluator.apply(free, counts, mods);
                case CrossSkuBuyXGetYDiscount discount -> ruleEvaluator.apply(discount, counts, mods);
                default -> throw new IllegalStateException("Unexpected value: " + rule);
            };

            if(applied) break;
        }
    }

    private void applySkuDiscount(Map<String, SkuMod> mods) {
        for(var rule : ruleEngine.getSkuDiscounts()){
            SkuMod skuMod = mods.get(rule.sku());
            if(skuMod != null && (skuMod.free() > 0 || skuMod.discounted() > 0)) {
                continue;
            }
            mods.put(rule.sku(), new SkuMod(0, 1, 1-rule.discount()));
        }
    }
}
