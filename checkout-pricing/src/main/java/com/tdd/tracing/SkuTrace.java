package com.tdd.tracing;

public record SkuTrace(
        String sku,
        int count,
        int free,
        int discounted,
        double rate,
        int remaining,
        int unitPrice,
        int discountedPrice,
        int dpPrice,
        int total
) {}