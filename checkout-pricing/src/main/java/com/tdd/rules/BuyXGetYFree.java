package com.tdd.rules;

public record BuyXGetYFree(int quantity, int price, int priority, boolean stackable) implements PricingOption {

    public static int calculateQuantity(int buy, int get) {
        return buy + get;
    }

    public static int calculatePrice(int buy, int unitPrice) {
        return buy * unitPrice;
    }
}