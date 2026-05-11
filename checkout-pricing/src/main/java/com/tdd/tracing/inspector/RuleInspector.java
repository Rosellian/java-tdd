package com.tdd.tracing.inspector;

import com.tdd.PricingRules;
import com.tdd.calculation.price.PriceEngine;
import com.tdd.calculation.price.PriceResult;
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
    private final PriceEngine priceEngine;

    public RuleInspector(PricingRules rules, BestPriceAlgorithm algorithm) {
        this.rules = rules;
        this.priceEngine = new PriceEngine(rules, algorithm);
    }

    public RuleTrace inspect(RuleContext finalContext, List<RuleTraceEvent> events) {
        List<SkuTrace> skuTraces = new ArrayList<>();
        List<DPTrace>  dpTraces = new ArrayList<>();

        for(var entry : finalContext.counts().entrySet()) {
            String sku = entry.getKey();
            int count = entry.getValue();
            SkuMod mod = finalContext.modOf(sku);

            PriceResult result = priceEngine.calculate(sku, count, mod);

            skuTraces.add(createSkuTrace(sku, count, mod, result));
        }

        double finalTotal = skuTraces.stream().mapToDouble(SkuTrace::total).sum();

        return new RuleTrace(events, skuTraces, dpTraces, finalTotal);
    }

    private SkuTrace createSkuTrace(String  sku, int count, SkuMod mod, PriceResult result) {
        double unitPrice = rules.getUnitPrice(sku);
        int free = mod.free();
        int discounted = mod.discounted();
        double rate = mod.rate();
        int remaining = result.remaining();
        double discountedPrice = result.discountedPrice();
        double dpPrice = result.dpPrice();
        double total = result.total();

        return new SkuTrace(sku, count, free, discounted, rate, remaining, unitPrice, discountedPrice, dpPrice, total);
    }
}
