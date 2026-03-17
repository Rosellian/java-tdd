package com.tdd.api.rest;

public class CartItemRequest {
    private String sku;
    private long quantity;

    public CartItemRequest(String sku, long quantity) {
        this.sku = sku;
        this.quantity = quantity;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }
}