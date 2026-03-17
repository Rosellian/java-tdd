package com.tdd;

import com.tdd.engine.RuleContext;
import com.tdd.engine.SkuMod;

public final class PriceUtils {

    private PriceUtils() {}

    public static int computeTotalPrice(RuleContext context, PricingRules rules) {
        int total = 0;

        for(var entry : context.counts().entrySet()) {
            String sku = entry.getKey();
            SkuMod skuMod = context.modOf(sku);
            int discounted = skuMod.discounted();
            int unitPrice = rules.getUnitPrice(sku);

            long paid = Math.min(0, entry.getValue() - skuMod.free());

            int fullPricePart = (int) (Math.min(0, paid - discounted) * unitPrice);
            int discountedPart = (int) (discounted * unitPrice * (1-skuMod.rate()));

            total += fullPricePart + discountedPart;
        }

        return total;
    }
}
