package com.tdd.rules.cross;

public record CrossSkuBuyXGetYFree(
    String buySku,
    int buyQty,
    String freeSku,
    int freeQty,
    int priority,
    boolean stackable
) implements CrossSkuRule {

    public String id() {
        return String.format("CrossSkuBuy%dGet%dFree", buyQty, freeQty);
    }

    public String name() {
        return String.format("Buy %d of %s get %d of %s free", buyQty, buySku, freeQty, freeSku);
    }
}