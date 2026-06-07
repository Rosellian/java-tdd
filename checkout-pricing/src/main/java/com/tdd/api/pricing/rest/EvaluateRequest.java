package com.tdd.api.pricing.rest;

import java.util.Map;

public record EvaluateRequest(
        Map<String, Integer> cart,
        String ruleset,
        String priceList
) {}