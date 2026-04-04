package com.tdd.rules;

public record BuyXGetYDiscount(int quantity, int price, int priority, boolean stackable) implements PricingOption {

    public static int calculateQuantity(int buy, int get) {
        return buy + get;
    }

    public static int calculatePrice(int buy, int unitPrice, int get, double discount) {
        return (int)(buy * unitPrice + get * unitPrice * (1-discount));
    }
}