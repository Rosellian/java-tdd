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

    public double calculateTotal(RuleContext context) {
        double total = 0;

        for(var entry : context.counts().entrySet()) {
            SkuTotal skuTotal = calculateTotalFor(context, entry);

            total += skuTotal.discountedPrice() + skuTotal.dpTrace().finalPrice();
        }

        return total;
    }

    private SkuTotal calculateTotalFor(RuleContext context, Map.Entry<String, Integer> entry) {
        String sku = entry.getKey();
        SkuMod mod = context.modOf(sku);

        int remaining = computeRemaining(entry, mod);
        double discountedPrice = calculateDiscounted(mod, sku);

        DPTrace dpTrace = dpAlgorithm.bestPriceFor(sku, remaining);

        return new SkuTotal(discountedPrice, dpTrace);
    }

    private double calculateDiscounted(SkuMod mod, String sku) {
        return mod.discounted() * rules.getUnitPrice(sku) * mod.rate();
    }

    private int computeRemaining(Map.Entry<String, Integer> entry, SkuMod mod) {
        int remaining = entry.getValue() - mod.free() - mod.discounted();
        if(remaining < 0) remaining = 0;

        return remaining;
    }

    private record SkuTotal(double discountedPrice, DPTrace dpTrace) {}
}
