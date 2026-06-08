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
        List<DPTrace> dpTraces = new ArrayList<>();

        for(var entry : finalContext.counts().entrySet()) {
            String sku = entry.getKey();
            int count = entry.getValue();
            SkuMod mod = finalContext.modOf(sku);

            PriceResult result = priceEngine.calculate(sku, count, mod);

            dpTraces.add(result.dpTrace());

            SkuTrace skuTrace = createSkuTrace(sku, count, mod, result);
            skuTraces.add(skuTrace);
        }

        double finalTotal = sumTotal(skuTraces);

        return new RuleTrace(events, skuTraces, dpTraces, finalTotal);
    }

    private static double sumTotal(List<SkuTrace> skuTraces) {
        return skuTraces.stream()
                .mapToDouble(SkuTrace::total)
                .sum();
    }

    private SkuTrace createSkuTrace(String sku, int count, SkuMod mod, PriceResult result) {
        double unitPrice = rules.getUnitPrice(sku);

        return SkuTrace.from(sku, count, mod, result, unitPrice);
    }
}
