package com.tdd.rules;

public record BuyXGetYDiscount(int buy, int get, double discount, int quantity, double price,
                               int priority, boolean stackable) implements PricingOption {

    @Override
    public String id() {
        return String.format("Buy%dGet%dDiscount", buy, get);
    }

    @Override
    public String name() {
        return String.format("Buy %d get %d at %.2f discount", buy, get, discount);
    }

    public static int calculateQuantity(int buy, int get) {
        return buy + get;
    }

    public static double calculatePrice(int buy, double unitPrice, int get, double discount) {
        return buy * unitPrice + get * unitPrice * (1-discount);
    }

    public static BuyXGetYDiscount from(int buy, int get, double unitPrice, double discount,
                                        int priority, boolean stackable) {
        int quantity = calculateQuantity(buy, get);
        double price = calculatePrice(buy, unitPrice, get, discount);

        return new BuyXGetYDiscount(buy, get, discount, quantity, price, priority, stackable);
    }
}