package com.tdd.api.samples;

import com.tdd.PricingRules;
import com.tdd.rules.*;
import com.tdd.rules.cross.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.cross.CrossSkuBuyXGetYFree;

import java.util.List;
import java.util.Map;

public class DefaultRules implements SampleRulesBuilder {

    public static PricingRules build() {

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

        return new PricingRules(DEFAULT_UNIT_PRICES, options, freeRules, discountRules, skuDiscounts);
    }
}