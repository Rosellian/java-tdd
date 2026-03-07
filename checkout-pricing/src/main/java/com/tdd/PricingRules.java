package com.tdd;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PricingRules {
    private final Map<String, Integer> unitPrices = new HashMap<>();
    private final Map<String, List<SpecialPrice>> specialPrices = new HashMap<>();

    public void addUnitPrice(String sku, int price) {
        unitPrices.put(sku, price);
    }

    public int getUnitPrice(String sku) {
        return unitPrices.get(sku);
    }

    public void addSpecialPrice(String sku, int quantity, int price) {
        specialPrices.computeIfAbsent(sku, key -> new ArrayList<>())
                .add(new SpecialPrice(quantity, price));
    }

    public List<SpecialPrice> getSpecialPrices(String sku) {
        return specialPrices.getOrDefault(sku, new ArrayList<>());
    }
}
