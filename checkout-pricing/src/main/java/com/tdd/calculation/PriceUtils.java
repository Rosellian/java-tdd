package com.tdd.calculation;

import com.tdd.PricingRules;
import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.SkuMod;

import java.util.Map;

public final class PriceUtils {

    private PriceUtils() {}

    public static double computeTotalPrice(RuleContext context, PricingRules rules) {
        double total = 0;

        for(var entry : context.counts().entrySet()) {
            PriceForSku result = calculatePrice(context, rules, entry);

            total += result.fullPricePart() + result.discountedPart();
        }

        return total;
    }

    private static PriceForSku calculatePrice(RuleContext context, PricingRules rules,
                                              Map.Entry<String, Integer> entry) {
        String sku = entry.getKey();
        SkuMod skuMod = context.modOf(sku);
        double unitPrice = rules.getUnitPrice(sku);

        int paid = calculatePaid(entry, skuMod);

        double fullPricePart = calculateFullPricePart(paid, skuMod.discounted(), unitPrice);
        double discountedPart = calculateDiscountedPart(unitPrice, skuMod);

        return new PriceForSku(fullPricePart, discountedPart);
    }

    private record PriceForSku(double fullPricePart, double discountedPart) {}

    private static double calculateDiscountedPart(double unitPrice, SkuMod skuMod) {
        return skuMod.discounted() * unitPrice * (1.0 - skuMod.rate());
    }

    private static double calculateFullPricePart(int paid, int discounted, double unitPrice) {
        return Math.max(0, paid - discounted) * unitPrice;
    }

    private static int calculatePaid(Map.Entry<String, Integer> entry, SkuMod skuMod) {
        return Math.max(0, entry.getValue() - skuMod.free());
    }
}
