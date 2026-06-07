package com.tdd.api.prices.data;

import java.util.List;

public record PriceList(
        String name,
        String version,
        List<Price> unitPrices
) {}
