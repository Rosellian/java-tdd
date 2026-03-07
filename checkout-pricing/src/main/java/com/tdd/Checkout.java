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

    public int total() {
        Map<String, Long> counts = items.stream()
                .collect(Collectors.groupingBy(sku -> sku, Collectors.counting()));
        int total = 0;

        for(var  entry : counts.entrySet()) {
            String sku = entry.getKey();
            long count = entry.getValue();

            total += bestPriceFor(sku, count);
        }

        return total;
    }

    private int bestPriceFor(String sku, long count) {
        int unitPrice = rules.getUnitPrice(sku);
        List<SpecialPrice> specialPrices = rules.getSpecialPrices(sku);
        Map<Long, Integer> countBestMapping = new HashMap<>();

        return getBestPriceFor(count, unitPrice, specialPrices, countBestMapping);
    }

    private int getBestPriceFor(long count, int unitPrice, List<SpecialPrice> specialPrices,
                                Map<Long, Integer> countBestMapping) {
        if(count == 0) return 0;
        if(countBestMapping.containsKey(count)) return countBestMapping.get(count);

        int best = (int) (count * unitPrice);

        for(SpecialPrice specialPrice : specialPrices) {
            if(count >= specialPrice.quantity()) {
                int candidate = specialPrice.price() + getBestPriceFor(count - specialPrice.quantity(),
                        unitPrice, specialPrices, countBestMapping);
                best = Math.min(best, candidate);
            }
        }

        countBestMapping.put(count, best);
        return best;
    }
}
