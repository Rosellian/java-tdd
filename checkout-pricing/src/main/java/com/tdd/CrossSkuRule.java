package com.tdd;

public interface CrossSkuRule {
    String buySku();
    int buyQty();
    int priority();
    boolean stackable();
}
