package com.tdd;

public record BuyXGetYFreeOption(int quantity, int price) implements PricingOption {}