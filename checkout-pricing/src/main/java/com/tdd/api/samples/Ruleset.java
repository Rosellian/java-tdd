package com.tdd.api.samples;

import java.util.Arrays;
import java.util.Map;

import static java.util.stream.Collectors.toMap;

public interface Ruleset {
    Map<String, Integer> DEFAULT_UNIT_PRICES = Arrays.stream(SKUs.values())
            .collect(toMap(Enum::name, sku -> sku.unitPrice));
}
