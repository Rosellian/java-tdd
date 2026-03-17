package com.tdd.rules;

public interface CrossSkuRule {
    String id();
    String name();
    String buySku();
    int buyQty();
    int priority();
    boolean stackable();
}
