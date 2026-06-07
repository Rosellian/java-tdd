package com.tdd.tracing.debug;

import com.tdd.api.samples.SKUs;

public class CartItem {
    private String sku;
    private int quantity;

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

    public static CartItem from(String sku, int quantity) {
        CartItem cartItem = new CartItem();
        cartItem.sku = sku;
        cartItem.quantity = quantity;

        return cartItem;
    }

    public static CartItem from(SKUs sku, int quantity) {
        return from(sku.name(),  quantity);
    }

    @Override
    public String toString() {
        return "CartItem{" +
                "sku='" + sku + '\'' +
                ", quantity=" + quantity +
                '}';
    }
}