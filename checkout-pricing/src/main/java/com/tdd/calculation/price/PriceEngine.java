package com.tdd.calculation.price;

import com.tdd.PricingRules;
import com.tdd.calculation.dp.BestPriceAlgorithm;
import com.tdd.engine.utility.SkuMod;
import com.tdd.tracing.DPTrace;

import static com.tdd.calculation.price.PriceUtils.calculateDiscountedPart;
import static com.tdd.calculation.price.PriceUtils.calculateRemaining;

public class PriceEngine {
    private final PricingRules rules;
    private final BestPriceAlgorithm algorithm;

    public PriceEngine(PricingRules rules, BestPriceAlgorithm algorithm) {
        this.rules = rules;
        this.algorithm = algorithm;
    }

    public PriceResult calculate(String sku, int count, SkuMod mod) {
        int remaining = calculateRemaining(count, mod);
        double unitPrice = rules.getUnitPrice(sku);
        double discountedPrice = calculateDiscountedPart(unitPrice, mod);

        DPTrace dpTrace = algorithm.bestPriceFor(sku, remaining);
        double dpPrice = dpTrace.finalPrice();

        double total = discountedPrice + dpPrice;

        return new PriceResult(remaining, discountedPrice, dpTrace, dpPrice, total);
    }
}
