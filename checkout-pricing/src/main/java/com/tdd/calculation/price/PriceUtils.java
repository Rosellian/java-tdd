package com.tdd.calculation.price;

import com.tdd.engine.utility.SkuMod;

public final class PriceUtils {

    private PriceUtils() {}

    public static int calculateRemaining(int count, SkuMod mod) {
        return Math.max(0, count - mod.free() - mod.discounted());
    }

    public static double calculateDiscountedPart(double unitPrice, SkuMod skuMod) {
        return skuMod.discounted() * unitPrice * skuMod.rate();
    }

    public static double calculateFullPricePart(int count, SkuMod skuMod, double unitPrice) {
        int paid = calculatePaid(count, skuMod.free());

        return Math.max(0, paid - skuMod.discounted()) * unitPrice;
    }

    private static int calculatePaid(int count, int free) {
        return Math.max(0, count - free);
    }
}
