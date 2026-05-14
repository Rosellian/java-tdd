package com.tdd.tracing.debug;

import com.tdd.api.rulesets.samples.SKUs;

public class CartItem {
    private String sku;
    private int quantity;
    private double unitPrice;

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public static CartItem from(String sku, int quantity, double unitPrice) {
        CartItem cartItem = new CartItem();
        cartItem.sku = sku;
        cartItem.quantity = quantity;
        cartItem.unitPrice = unitPrice;

        return cartItem;
    }

    public static CartItem from(SKUs sku, int quantity) {
        return from(sku.name(),  quantity, sku.unitPrice);
    }

    @Override
    public String toString() {
        return "CartItem{" +
                "sku='" + sku + '\'' +
                ", quantity=" + quantity +
                ", unitPrice=" + unitPrice +
                '}';
    }
}