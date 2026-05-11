package com.tdd.calculation;

import com.tdd.PricingRules;
import com.tdd.calculation.dp.BestPriceAlgorithm;
import com.tdd.calculation.price.PriceEngine;
import com.tdd.calculation.price.PriceResult;
import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.SkuMod;
import com.tdd.tracing.debug.PricingTraceCollector;

public class PriceCalculator {
    private final PriceEngine priceEngine;

    public PriceCalculator(PricingRules rules, PricingTraceCollector collector) {
        priceEngine = new PriceEngine(rules, new BestPriceAlgorithm(rules, collector));
    }

    public double calculateTotal(RuleContext context) {
        double total = 0;

        for(var entry : context.counts().entrySet()) {
            String sku = entry.getKey();
            int count = entry.getValue();
            SkuMod mod = context.modOf(sku);

            PriceResult result = priceEngine.calculate(sku, count, mod);
            total += result.total();
        }

        return total;
    }
}
