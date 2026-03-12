package com.tdd.logging;

public record SkuTrace(
        String sku,
        long count,
        long free,
        long discounted,
        double rate,
        long remaining,
        int unitPrice,
        int discountedPrice,
        int dpPrice,
        int total
) {}