package com.tdd.api.rulesets.data.rules.sku;

public class SpecialPrice extends StackableSkuRule {
    private double price;
    private int quantity;

    public SpecialPrice() {}

    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
