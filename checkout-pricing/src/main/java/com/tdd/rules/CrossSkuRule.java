package com.tdd.rules;

public interface CrossSkuRule extends Rule {
    String buySku();
    int buyQty();
    int priority();
    boolean stackable();
}
