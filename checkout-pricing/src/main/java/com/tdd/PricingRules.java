package com.tdd;

import java.util.HashMap;
import java.util.Map;

public class PricingRules {
    private final Map<String, Integer> unitPrices = new HashMap<>();
    private final Map<String, SpecialPrice> specialPrices = new HashMap<>();

    public void addUnitPrice(String sku, int price) {
        unitPrices.put(sku, price);
    }

    public int getUnitPrice(String sku) {
        return unitPrices.get(sku);
    }

    public void addSpecialPrice(String sku, int quantity, int price) {
        specialPrices.put(sku, new SpecialPrice(quantity, price));
    }

    public SpecialPrice getSpecialPrice(String sku) {
        return specialPrices.get(sku);
    }
}
