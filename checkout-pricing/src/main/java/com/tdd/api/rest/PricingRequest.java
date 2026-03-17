package com.tdd.api.rest;

import java.util.List;
import java.util.Map;

public class PricingRequest {
    private String ruleSet;
    private List<CartItemRequest> items;
    private CustomerRequest customer;
    private Map<String, Object> context;

    public String getRuleSet() {
        return ruleSet;
    }

    public void setRuleSet(String ruleSet) {
        this.ruleSet = ruleSet;
    }

    public List<CartItemRequest> getItems() {
        return items;
    }

    public void setItems(List<CartItemRequest> items) {
        this.items = items;
    }

    public CustomerRequest getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerRequest customer) {
        this.customer = customer;
    }

    public Map<String, Object> getContext() {
        return context;
    }

    public void setContext(Map<String, Object> context) {
        this.context = context;
    }
}