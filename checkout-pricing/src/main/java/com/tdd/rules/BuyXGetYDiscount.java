package com.tdd.rules;

public record BuyXGetYDiscount(int quantity, double price, int priority, boolean stackable) implements PricingOption {

    public static int calculateQuantity(int buy, int get) {
        return buy + get;
    }

    public static double calculatePrice(int buy, double unitPrice, int get, double discount) {
        return buy * unitPrice + get * unitPrice * (1-discount);
    }
}