package com.tdd.rules;

public record BuyXGetYFree(int quantity, int price, int priority, boolean stackable) implements PricingOption {
}