package com.tdd;

import java.util.ArrayList;
import java.util.List;

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
        return 0;
    }
}
