package com.tdd;

import com.tdd.engine.RuleContext;
import com.tdd.engine.SkuMod;

import java.util.Map;

public final class PriceUtils {

    private PriceUtils() {}

    public static int computeTotalPrice(RuleContext context, PricingRules rules) {
        int total = 0;

        for(var entry : context.counts().entrySet()) {
            PriceForSku result = calculatePrice(context, rules, entry);

            total += result.fullPricePart() + result.discountedPart();
        }

        return total;
    }

    private static PriceForSku calculatePrice(RuleContext context, PricingRules rules, Map.Entry<String, Long> entry) {
        String sku = entry.getKey();
        SkuMod skuMod = context.modOf(sku);
        int unitPrice = rules.getUnitPrice(sku);

        int paid = calculatePaid(entry, skuMod);

        int fullPricePart = calculateFullPricePart(paid, skuMod.discounted(), unitPrice);
        int discountedPart = calculateDiscountedPart(unitPrice, skuMod);

        return new PriceForSku(fullPricePart, discountedPart);
    }

    private record PriceForSku(int fullPricePart, int discountedPart) {}

    private static int calculateDiscountedPart(int unitPrice, SkuMod skuMod) {
        return (int) (skuMod.discounted() * unitPrice * (1.0 - skuMod.rate()));
    }

    private static int calculateFullPricePart(int paid, int discounted, int unitPrice) {
        return Math.max(0, paid - discounted) * unitPrice;
    }

    private static int calculatePaid(Map.Entry<String, Long> entry, SkuMod skuMod) {
        return (int) Math.max(0, entry.getValue() - skuMod.free());
    }
}
