package com.tdd.tracing.debug;

import java.util.List;
import java.util.Map;

public class CartSnapshot {
    private List<CartItem> items;
    private CustomerInfo customer;
    private Map<String, Object> context;

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    public CustomerInfo getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerInfo customer) {
        this.customer = customer;
    }

    public Map<String, Object> getContext() {
        return context;
    }

    public void setContext(Map<String, Object> context) {
        this.context = context;
    }

    public static CartSnapshot from(List<CartItem> items, CustomerInfo customerInfo, Map<String, Object> context) {
        CartSnapshot cartSnapshot = new CartSnapshot();
        cartSnapshot.items = items;
        cartSnapshot.customer = customerInfo;
        cartSnapshot.context = context;

        return cartSnapshot;
    }

    public static CartSnapshot from(List<CartItem> items) {
        return CartSnapshot.from(items, null, null);
    }
}