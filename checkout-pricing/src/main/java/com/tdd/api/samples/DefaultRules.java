package com.tdd.api.samples;

import com.tdd.PricingRules;
import com.tdd.rules.*;

import java.util.List;
import java.util.Map;

public class DefaultRules {

    public static PricingRules build() {

        Map<String, Integer> unitPrices = Map.of(
                "A", 50,
                "B", 40,
                "C", 25,
                "D", 20
        );

        Map<String, List<PricingOption>> options = Map.of(
                "A", List.of(
                        new SpecialPrice(3, 130, 1, true)   // 3-for-130
                ),
                "B", List.of(
                        new SpecialPrice(2, 40, 1,false)   // 2-for-40 (non-stackable)
                ),
                "C", List.of(),
                "D", List.of()
        );

        List<CrossSkuBuyXGetYFree> freeRules = List.of(
                // no cross-SKU in default
        );

        List<CrossSkuBuyXGetYDiscount> discountRules = List.of(
                // no cross-SKU in default
        );

        List<SkuDiscount> skuDiscounts = List.of(
                // no per-SKU discounts in default
        );

        return new PricingRules(unitPrices, options, freeRules, discountRules, skuDiscounts);
    }
}