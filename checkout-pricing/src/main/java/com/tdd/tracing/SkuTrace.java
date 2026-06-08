package com.tdd.tracing;

import com.tdd.calculation.price.PriceResult;
import com.tdd.engine.utility.SkuMod;

public record SkuTrace(
        String sku,
        int count,
        int free,
        int discounted,
        double rate,
        int remaining,
        double unitPrice,
        double discountedPrice,
        double dpPrice,
        double total
) {

    public static SkuTrace from(String sku, int count, SkuMod mod, PriceResult result, double unitPrice) {

        return new SkuTrace(sku, count, mod.free(), mod.discounted(), mod.rate(), result.remaining(), unitPrice,
                result.discountedPrice(), result.dpPrice(), result.total());
    }
}