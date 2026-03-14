package com.tdd.rules;

public record BuyXGetYDiscount(int quantity, int price, int priority, boolean stackable)
        implements PricingOption {
}