package com.tdd.calculation;

import com.tdd.PricingRules;
import com.tdd.calculation.dp.BestPriceAlgorithm;
import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.SkuMod;
import com.tdd.tracing.DPTrace;
import com.tdd.tracing.debug.PricingTraceCollector;

import java.util.Map;

public class PriceCalculator {
    private final PricingRules rules;
    private final BestPriceAlgorithm dpAlgorithm;

    public PriceCalculator(PricingRules rules, PricingTraceCollector collector) {
        this.rules = rules;
        this.dpAlgorithm = new BestPriceAlgorithm(rules,  collector);
    }

    public int calculateTotal(RuleContext context) {
        int total = 0;

        for(var entry : context.counts().entrySet()) {
            SkuTotal skuTotal = calculateTotalFor(context, entry);

            total += skuTotal.discountedPrice() + skuTotal.dpTrace().finalPrice();
        }

        return total;
    }

    private SkuTotal calculateTotalFor(RuleContext context, Map.Entry<String, Long> entry) {
        String sku = entry.getKey();
        SkuMod mod = context.modOf(sku);

        long remaining = computeRemaining(entry, mod);
        int discountedPrice = calculateDiscounted(mod, sku);

        DPTrace dpTrace = dpAlgorithm.bestPriceFor(sku, remaining);

        return new SkuTotal(discountedPrice, dpTrace);
    }

    private int calculateDiscounted(SkuMod mod, String sku) {
        return (int)(mod.discounted() * rules.getUnitPrice(sku) * mod.rate());
    }

    private long computeRemaining(Map.Entry<String, Long> entry, SkuMod mod) {
        long remaining = entry.getValue() - mod.free() - mod.discounted();
        if(remaining < 0) remaining = 0;

        return remaining;
    }

    private record SkuTotal(int discountedPrice, DPTrace dpTrace) {}
}
