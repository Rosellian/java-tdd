package com.tdd.tracing.inspector;

import com.tdd.PricingRules;
import com.tdd.calculation.dp.BestPriceAlgorithm;
import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.SkuMod;
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
            int count = entry.getValue();

            SkuMod mod = finalContext.modOf(sku);
            int free = mod.free();
            int discounted  = mod.discounted();
            double rate  = mod.rate();

            int remaining = count - free - discounted;

            double unitPrice = rules.getUnitPrice(sku);
            double discountedPrice = discounted * unitPrice * rate;

            DPTrace dpTrace = algorithm.bestPriceFor(sku, remaining);
            dpTraces.add(dpTrace);

            double dpPrice = dpTrace.finalPrice();
            double total = discountedPrice + dpPrice;

            skuTraces.add(new SkuTrace(sku, count, free, discounted, rate, remaining,
                    unitPrice, discountedPrice, dpPrice, total));
        }

        double finalTotal = skuTraces.stream().mapToDouble(SkuTrace::total).sum();

        return new RuleTrace(events, skuTraces, dpTraces, finalTotal);
    }
}
