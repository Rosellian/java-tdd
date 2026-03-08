package com.tdd;

public record BuyXGetYDiscountOption(int quantity, int price, boolean stackable)
        implements PricingOption {
    @Override
    public int priority() {
        return 1;
    }
}