package com.tdd;

import java.util.ArrayList;
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

            SpecialPrice sp = rules.getSpecialPrice(sku);
            if(sp != null) {
                long specials = count / sp.quantity();
                long remainder = count % sp.quantity();
                total += (int) (specials * sp.price());
                total += (int) (remainder * rules.getUnitPrice(sku));
            }
            else {
                total += (int) (count * rules.getUnitPrice(sku));
            }
        }

        return total;
    }
}
