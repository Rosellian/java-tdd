package com.tdd;

import java.util.HashMap;
import java.util.Map;

public class PricingRules {
    private final Map<String, Integer> unitPrices = new HashMap<>();

    public void addUnitPrice(String unit, int price) {
        unitPrices.put(unit, price);
    }

    public int getUnitPrice(String unit) {
        return unitPrices.get(unit);
    }
}
