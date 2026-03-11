package com.tdd.rules;

public record CrossSkuBuyXGetYDiscount(
    String buySku,
    int buyQty,
    String discountSku,
    int discountQty,
    double discount,
    int priority,
    boolean stackable
) implements CrossSkuRule {}