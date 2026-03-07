package com.tdd;

import java.util.*;
import java.util.stream.Collectors;

public class Checkout {
    private final PricingRules rules;
    private final List<String> items = new ArrayList<>();

    public Checkout(PricingRules rules) {
        this.rules = rules;
    }

    public void scan(String unit) {
        items.add(unit);
    }

    private List<PricingOption> getOptionsFor(String sku) {
        List<PricingOption> options = new ArrayList<>(rules.getSpecialPrices(sku));

        for(BuyXGetYFree rule : rules.getBuyXGetYFree(sku)) {
            int quantity = rule.buy() + rule.free();
            options.add(new BuyXGetYFreeOption(quantity, rule.buy() * rules.getUnitPrice(sku)));
        }

        options.sort(Comparator.comparingInt(PricingOption::priority));

        return options;
    }

    public int total() {
        Map<String, Long> counts = items.stream()
                .collect(Collectors.groupingBy(sku -> sku, Collectors.counting()));
        int total = 0;

        for(var entry : counts.entrySet()) {
            total += bestPriceFor(entry.getKey(), entry.getValue());
        }

        return total;
    }

    private int bestPriceFor(String sku, long count) {
        int unitPrice = rules.getUnitPrice(sku);
        List<PricingOption> options = getOptionsFor(sku);
        Map<Long, Integer> countBestMapping = new HashMap<>();

        return bestPriceFor(count, unitPrice, options, countBestMapping);
    }

    private int bestPriceFor(long count, int unitPrice, List<PricingOption> options,
                                Map<Long, Integer> countBestMapping) {
        if(count == 0) return 0;
        if(countBestMapping.containsKey(count)) return countBestMapping.get(count);

        int best = (int) (count * unitPrice);

        for(PricingOption opt : options) {
            if(count >= opt.quantity()) {
                if(opt.stackable()) {
                    int candidate = opt.price() + bestPriceFor(count - opt.quantity(),
                            unitPrice, options, countBestMapping);
                    best = Math.min(best, candidate);
                }
                else {
                    int candidate = (int) (opt.price() + (count - opt.quantity()) * unitPrice);
                    best = Math.min(best, candidate);
                }
            }
        }

        countBestMapping.put(count, best);
        return best;
    }
}
