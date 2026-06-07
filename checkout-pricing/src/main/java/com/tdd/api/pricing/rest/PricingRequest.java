package com.tdd.api.pricing.rest;

import com.tdd.api.pricing.rest.data.CartItemRequest;
import com.tdd.api.pricing.rest.data.CustomerRequest;

import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

public record PricingRequest(
        String ruleset,
        String priceList,
        List<CartItemRequest> items,
        CustomerRequest customer,
        Map<String, Object> context
) {

    public static PricingRequest fromRequest(EvaluateRequest request) {
        CustomerRequest customer = null;
        Map<String, Object> context = null;

        return new PricingRequest(request.ruleset(), request.priceList(), fromRequest(request.cart()), customer, context);
    }

    private static List<CartItemRequest> fromRequest(Map<String, Integer> cart) {
        return cart.entrySet().stream()
                .map(CartItemRequest::fromCartEntry)
                .collect(toList());
    }
}