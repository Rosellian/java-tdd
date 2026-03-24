package com.tdd.api.samples;

public enum SKUs {
    A(50),
    B(40),
    C(25),
    D(20),
    E(10);

    public final int unitPrice;

    SKUs(int unitPrice) {
        this.unitPrice = unitPrice;
    }
}
