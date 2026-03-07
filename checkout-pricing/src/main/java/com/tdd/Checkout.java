package com.tdd;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Checkout {
    private final PricingRules rules;
    private final List<String> items = new ArrayList<>();

    public Checkout(PricingRules rules) {
        this.rules = rules;
    }

    public void scan(String unit) {
        items.add(unit);
    }

    public int total() {
        Map<String, Long> counts = items.stream()
                .collect(Collectors.groupingBy(sku -> sku, Collectors.counting()));
        int total = 0;

        for(var  entry : counts.entrySet()) {
            String sku = entry.getKey();
            long count = entry.getValue();

            List<SpecialPrice> sps = rules.getSpecialPrices(sku);

            if(!sps.isEmpty()) {
                sps = sps.stream().sorted(Comparator.comparingInt(SpecialPrice::quantity).reversed())
                        .toList();
                for(SpecialPrice sp : sps) {
                    long used = count / sp.quantity();
                    total += (int) (used * sp.price());
                    count -= used * sp.quantity();
                }
                total += (int) (count * rules.getUnitPrice(sku));
            }
            else {
                total += (int) (count * rules.getUnitPrice(sku));
            }
        }

        return total;
    }
}
