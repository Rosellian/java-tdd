package com.tdd.api.prices.data;

import java.util.UUID;

public record PriceListEntry(
        UUID id,
        String name,
        String version
) {}
