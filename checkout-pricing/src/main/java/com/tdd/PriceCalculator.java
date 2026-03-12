package com.tdd;

import com.tdd.rules.PricingOption;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PriceCalculator {
    private final PricingRules rules;

    public PriceCalculator(PricingRules rules) {
        this.rules = rules;
    }

    public int calculateTotal(RuleContext context) {
        int total = 0;

        for(var entry : context.counts().entrySet()) {
            String sku = entry.getKey();
            SkuMod mod = context.modOf(sku);

            long discounted = mod.discounted();

            long remaining = entry.getValue() - mod.free() - discounted;
            if(remaining < 0) remaining = 0;

            int discountedPrice = (int)(discounted * rules.getUnitPrice(sku) * mod.rate());
            total += discountedPrice + bestPriceFor(sku, remaining);
        }

        return total;
    }

    private int bestPriceFor(String sku, long count) {
        int unitPrice = rules.getUnitPrice(sku);
        List<PricingOption> options = rules.getPricingOptions(sku);
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
                if(!opt.stackable()) {
                    int candidate = (int) (opt.price() + (count - opt.quantity()) * unitPrice);
                    best = Math.min(best, candidate);
                    continue;
                }
                int candidate = opt.price() + bestPriceFor(count - opt.quantity(),
                        unitPrice, options, countBestMapping);
                best = Math.min(best, candidate);
            }
        }

        countBestMapping.put(count, best);
        return best;
    }
}
