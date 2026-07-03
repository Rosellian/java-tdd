package com.tdd.api.prices.data;

import java.util.UUID;

public record Price(
        UUID id,
        String sku,
        double price
) {}
