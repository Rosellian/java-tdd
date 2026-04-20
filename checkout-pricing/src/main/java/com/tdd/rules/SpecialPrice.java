package com.tdd.rules;

public record SpecialPrice(int quantity, double price, int priority, boolean stackable) implements PricingOption {
}