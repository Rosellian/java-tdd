package com.tdd;

import com.tdd.rules.*;

import java.util.*;
import java.util.stream.Collectors;

public class Checkout {
    private final RuleEngine ruleEngine;
    private final PriceCalculator calculator;

    private final List<String> items = new ArrayList<>();

    public Checkout(PricingRules rules) {
        ruleEngine = new RuleEngine(rules);
        calculator = new PriceCalculator(rules);
    }

    public void scan(String unit) {
        items.add(unit);
    }

    public int total() {
        Map<String, Long> counts = countItems();
        Map<String, SkuMod> mods = new HashMap<>();
        RuleContext context = new RuleContext(counts, mods);

        context = ruleEngine.evaluate(context);

        return calculator.calculateTotal(context);
    }

    private Map<String, Long> countItems() {
        return items.stream()
                .collect(Collectors.groupingBy(sku -> sku, Collectors.counting()));
    }
}
