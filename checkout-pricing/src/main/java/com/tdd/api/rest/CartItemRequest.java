package com.tdd.api.rest;

import java.util.Map;

public class CartItemRequest {
    private String sku;
    private long quantity;

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

    public static CartItemRequest fromCartEntry(Map.Entry<String, Long> entry) {
        CartItemRequest request = new CartItemRequest();
        request.sku = entry.getKey();
        request.quantity = entry.getValue();

        return request;
    }
}