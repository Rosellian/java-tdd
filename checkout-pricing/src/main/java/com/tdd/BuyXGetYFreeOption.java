package com.tdd;

public record BuyXGetYFreeOption(int quantity, int price) implements PricingOption {
    @Override
    public int priority() {
        return 2;
    }

    @Override
    public boolean stackable() {
        return false;
    }
}