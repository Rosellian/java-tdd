package com.tdd.calculation.price;

import com.tdd.engine.utility.SkuMod;

public final class PriceUtils {

    private PriceUtils() {}

    public static int calculateRemaining(int count, SkuMod mod) {
        int remaining = count - mod.free() - mod.discounted();

        return Math.max(0, remaining);
    }

    public static double calculateDiscountedPart(double unitPrice, SkuMod skuMod) {
        return skuMod.discounted() * unitPrice * skuMod.rate();
    }

    public static double calculateFullPricePart(int count, SkuMod skuMod, double unitPrice) {
        int paid = calculatePaid(count, skuMod.free());
        int notDiscounted = paid - skuMod.discounted();

        return Math.max(0, notDiscounted) * unitPrice;
    }

    private static int calculatePaid(int count, int free) {
        int paid = count - free;

        return Math.max(0, paid);
    }
}
