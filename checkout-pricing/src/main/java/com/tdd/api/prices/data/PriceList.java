package com.tdd.api.prices.data;

import java.util.List;
import java.util.UUID;

public record PriceList(
        UUID id,
        String name,
        String version,
        List<Price> unitPrices
) {}
