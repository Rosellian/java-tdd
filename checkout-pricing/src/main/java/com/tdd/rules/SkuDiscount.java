package com.tdd.rules;

public record SkuDiscount(
        String sku,
        double discount,
        int priority
) implements Rule {

    public String id() {
        return String.format("%s-Discount", sku);
    }
    public String name() {
        return String.format("Buy %s at %.2f discount", sku, discount);
    }
}