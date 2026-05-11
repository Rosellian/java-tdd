package com.tdd.calculation;

import com.tdd.PricingRules;
import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.SkuMod;

import java.util.Map;

import static com.tdd.calculation.price.PriceUtils.*;

public class StepPriceComputer {
    private final PricingRules rules;

    public StepPriceComputer(PricingRules rules) {
        this.rules = rules;
    }

    public double computeTotalPrice(RuleContext context) {
        double total = 0;

        for(var entry : context.counts().entrySet()) {
            double result = calculatePrice(context, entry);

            total += result;
        }

        return total;
    }

    private double calculatePrice(RuleContext context, Map.Entry<String, Integer> entry) {
        String sku = entry.getKey();
        SkuMod skuMod = context.modOf(sku);
        double unitPrice = rules.getUnitPrice(sku);

        double fullPricePart = calculateFullPricePart(entry.getValue(), skuMod, unitPrice);
        double discountedPart = calculateDiscountedPart(unitPrice, skuMod);

        return fullPricePart + discountedPart;
    }
}
