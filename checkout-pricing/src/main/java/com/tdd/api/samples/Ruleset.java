package com.tdd.api.samples;

import java.util.Arrays;
import java.util.Map;

import static java.util.stream.Collectors.toMap;

public interface Ruleset {
    Map<String, Integer> DEFAULT_UNIT_PRICES = Arrays.stream(SKUs.values())
            .collect(toMap(Enum::name, sku -> sku.unitPrice));

    static Map<String, Integer> defaultUnitPricesWithChange(String sku, int unitPrice) {
        Map<String, Integer> unitPrices = DEFAULT_UNIT_PRICES.entrySet().stream()
                .collect(toMap(Map.Entry::getKey, Map.Entry::getValue));
        unitPrices.put(sku, unitPrice);

        return unitPrices;
    }
}
