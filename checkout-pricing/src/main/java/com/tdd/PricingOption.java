package com.tdd;

public interface PricingOption {
    int price();      // what does this package cost?
    int quantity();   // how many items are consumed?
    int priority();   // lower = higher priority
    boolean stackable();
}