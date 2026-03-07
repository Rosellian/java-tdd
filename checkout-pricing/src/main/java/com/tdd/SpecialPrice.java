package com.tdd;

public record SpecialPrice(int quantity, int price) implements PricingOption {
    @Override
    public int priority() {
        return 1;
    }

    @Override
    public boolean stackable() {
        return true;
    }
}