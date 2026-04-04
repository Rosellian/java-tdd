package com.tdd.tracing.inspector;

import com.tdd.PricingRules;
import com.tdd.calculation.dp.BestPriceAlgorithm;
import com.tdd.engine.RuleContext;
import com.tdd.engine.SkuMod;
import com.tdd.tracing.DPTrace;
import com.tdd.tracing.RuleTraceEvent;
import com.tdd.tracing.RuleTrace;
import com.tdd.tracing.SkuTrace;

import java.util.ArrayList;
import java.util.List;

public class RuleInspector {
    private final PricingRules rules;
    private final BestPriceAlgorithm algorithm;

    public RuleInspector(PricingRules rules, BestPriceAlgorithm algorithm) {
        this.rules = rules;
        this.algorithm = algorithm;
    }

    public RuleTrace inspect(RuleContext finalContext, List<RuleTraceEvent> events) {
        List<SkuTrace> skuTraces = new ArrayList<>();
        List<DPTrace>  dpTraces = new ArrayList<>();

        for(var entry : finalContext.counts().entrySet()) {
            String sku = entry.getKey();
            long count = entry.getValue();

            SkuMod mod = finalContext.modOf(sku);
            long free = mod.free();
            long discounted  = mod.discounted();
            double rate  = mod.rate();

            long remaining = count - free - discounted;

            int unitPrice = rules.getUnitPrice(sku);
            int discountedPrice = (int) (discounted * unitPrice * rate);

            DPTrace dpTrace = algorithm.bestPriceFor(sku, remaining);
            dpTraces.add(dpTrace);

            int dpPrice = dpTrace.finalPrice();
            int total = discountedPrice + dpPrice;

            skuTraces.add(new SkuTrace(sku, count, free, discounted, rate, remaining,
                    unitPrice, discountedPrice, dpPrice, total));
        }

        int finalTotal = skuTraces.stream().mapToInt(SkuTrace::total).sum();

        return new RuleTrace(events, skuTraces, dpTraces, finalTotal);
    }
}
