package com.tdd.api.pricing.rest;

import com.tdd.api.prices.data.PriceListEntry;
import com.tdd.api.pricing.rest.data.CartItemRequest;
import com.tdd.api.pricing.rest.data.CustomerRequest;
import com.tdd.api.rulesets.data.RulesetEntry;

import java.util.List;
import java.util.Map;

public record PricingRequest(
        RulesetEntry ruleset,
        PriceListEntry priceList,
        List<CartItemRequest> items,
        CustomerRequest customer,
        Map<String, Object> context
) {}