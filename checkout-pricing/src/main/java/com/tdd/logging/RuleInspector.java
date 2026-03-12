package com.tdd.logging;

import com.tdd.PriceCalculator;
import com.tdd.PricingRules;
import com.tdd.engine.RuleContext;
import com.tdd.engine.SkuMod;

import java.util.ArrayList;
import java.util.List;

public class RuleInspector {
    private final PricingRules rules;
    private final PriceCalculator calculator;

    public RuleInspector(PricingRules rules, PriceCalculator calculator) {
        this.rules = rules;
        this.calculator = calculator;
    }

    public RuleTrace inspect(RuleContext finalContext, List<RuleDebugEvent> events) {
        List<SkuTrace> skuTraces = new ArrayList<>();

        for(var entry : finalContext.counts().entrySet()) {
            String sku = entry.getKey();
            long count = entry.getValue();

            SkuMod mod = finalContext.modOf(sku);
            long free = mod.free();
            long discounted  = mod.discounted();
            double rate  = mod.rate();

            long remaining = count - free -  discounted;

            int unitPrice = rules.getUnitPrice(sku);

            int discountedPrice = (int) (discounted * unitPrice * rate);
            int dpPrice = calculator.bestPriceFor(sku, remaining);

            int total = discountedPrice + dpPrice;

            skuTraces.add(new SkuTrace(sku, count, free, discounted, rate, remaining,
                    unitPrice, discountedPrice, dpPrice, total));
        }

        int finalTotal = skuTraces.stream().mapToInt(SkuTrace::total).sum();
        return new RuleTrace(events, skuTraces, finalTotal);
    }
}
