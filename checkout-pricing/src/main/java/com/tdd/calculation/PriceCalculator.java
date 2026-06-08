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
        BestPriceAlgorithm algorithm = new BestPriceAlgorithm(rules, collector);
        priceEngine = new PriceEngine(rules, algorithm);
    }

    public double calculateTotal(RuleContext context) {
        double total = 0;

        for(var count : context.counts().entrySet()) {
            String sku = count.getKey();
            SkuMod mod = context.modOf(sku);

            PriceResult result = priceEngine.calculate(sku, count.getValue(), mod);
            total += result.total();
        }

        return total;
    }
}
