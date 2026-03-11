package com.tdd.rules;

public interface CrossSkuRule {
    String buySku();
    int buyQty();
    int priority();
    boolean stackable();
}
