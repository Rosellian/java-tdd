package com.tdd;

public record BuyXGetYFreeOption(int quantity, int price, boolean stackable) implements PricingOption {
    @Override
    public int priority() {
        return 2;
    }
}