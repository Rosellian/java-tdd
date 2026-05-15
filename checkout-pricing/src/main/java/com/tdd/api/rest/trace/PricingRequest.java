package com.tdd.api.rest.trace;

import com.tdd.api.rest.evaluate.EvaluateRequest;

import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

public class PricingRequest {
    private String ruleset;
    private List<CartItemRequest> items;
    private CustomerRequest customer;
    private Map<String, Object> context;

    public String getRuleset() {
        return ruleset;
    }

    public void setRuleset(String ruleSet) {
        this.ruleset = ruleset;
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

    public static PricingRequest fromEvaluateRequest(EvaluateRequest request) {
        PricingRequest pricingRequest = new PricingRequest();
        pricingRequest.ruleset = request.ruleset;
        pricingRequest.items = fromRequest(request);

        return pricingRequest;
    }

    private static List<CartItemRequest> fromRequest(EvaluateRequest request) {
        return request.cart.entrySet().stream()
                .map(CartItemRequest::fromCartEntry)
                .collect(toList());
    }
}