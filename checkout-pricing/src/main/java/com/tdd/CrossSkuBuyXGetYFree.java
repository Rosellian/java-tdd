package com.tdd;

public record CrossSkuBuyXGetYFree(
    String buySku,
    int buyQty,
    String freeSku,
    int freeQty,
    int priority,
    boolean stackable
) {}