package com.tdd.api.pricing.rest;

import com.tdd.api.pricing.rest.data.CartItemRequest;
import com.tdd.api.pricing.rest.data.CustomerRequest;

import java.util.List;
import java.util.Map;

public record PricingRequest(
        String ruleset,
        String priceList,
        List<CartItemRequest> items,
        CustomerRequest customer,
        Map<String, Object> context
) {}