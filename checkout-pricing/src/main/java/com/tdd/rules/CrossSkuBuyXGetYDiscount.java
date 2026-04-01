package com.tdd.rules;

public record CrossSkuBuyXGetYDiscount(
    String buySku,
    int buyQty,
    String discountSku,
    int discountQty,
    double discount,
    int priority,
    boolean stackable
) implements CrossSkuRule {
    public String id() {
        return String.format("CrossSkuBuy%dGet%dDiscount", buyQty, discountQty);
    }
    public String name() {
        return String.format("Buy %d of %s get %d of %s at %.2f discount", buyQty, buySku,
                discountQty, discountSku, discount);
    }
}