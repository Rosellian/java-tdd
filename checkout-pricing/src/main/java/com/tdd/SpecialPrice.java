package com.tdd;

public record SpecialPrice(int quantity, int price, int priority, boolean stackable) implements PricingOption {
}