package com.tdd.rules;

public record BuyXGetYFree(int buy, int get, int quantity, double price, int priority, boolean stackable)
        implements PricingOption {

    @Override
    public String id() {
        return String.format("Buy%dGet%dFree", buy, get);
    }

    @Override
    public String name() {
        return String.format("Buy %d get %d free", buy, get);
    }

    public static int calculateQuantity(int buy, int get) {
        return buy + get;
    }

    public static double calculatePrice(int buy, double unitPrice) {
        return buy * unitPrice;
    }

    public static BuyXGetYFree from(int buy, int get, double unitPrice, int priority, boolean stackable) {
        int quantity = calculateQuantity(buy, get);
        double price = calculatePrice(buy, unitPrice);

        return new BuyXGetYFree(buy, get, quantity, price, priority, stackable);
    }
}