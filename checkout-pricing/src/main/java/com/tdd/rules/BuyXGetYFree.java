package com.tdd.rules;

public record BuyXGetYFree(int quantity, double price, int priority, boolean stackable) implements PricingOption {

    public static int calculateQuantity(int buy, int get) {
        return buy + get;
    }

    public static double calculatePrice(int buy, double unitPrice) {
        return buy * unitPrice;
    }
}