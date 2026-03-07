package com.tdd;

import java.util.List;

public interface PricingRule {
    int calculatePrice(List<String> items);
}