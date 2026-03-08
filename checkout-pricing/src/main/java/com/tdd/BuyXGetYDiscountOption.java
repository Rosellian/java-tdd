package com.tdd;

public record BuyXGetYDiscountOption(int quantity, int price, int priority, boolean stackable)
        implements PricingOption {
}