package com.tdd.rules.cross;

import com.tdd.rules.Rule;

public interface CrossSkuRule extends Rule {
    String buySku();
    int buyQty();
    int priority();
    boolean stackable();
}
