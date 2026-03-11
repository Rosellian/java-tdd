package com.tdd.rules;

public record BuyXGetYDiscount(int buy, int get, double discount, boolean stackable) {}