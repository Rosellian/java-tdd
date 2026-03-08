package com.tdd;

public record BuyXGetYFreeOption(int quantity, int price, int priority, boolean stackable) implements PricingOption {
}