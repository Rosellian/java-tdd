package com.tdd.tracing;

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
) {}