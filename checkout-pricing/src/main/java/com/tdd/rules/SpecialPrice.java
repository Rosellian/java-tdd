package com.tdd.rules;

public record SpecialPrice(int quantity, double price, int priority, boolean stackable) implements PricingOption {

    @Override
    public String id() {
        return String.format("Buy%dFor%.2f", quantity, price);
    }
    @Override
    public String name() {
        return String.format("Special Price buy %d for %.2f", quantity, price);
    }
}