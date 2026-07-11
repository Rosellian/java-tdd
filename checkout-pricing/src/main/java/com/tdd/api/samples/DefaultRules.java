package com.tdd.api.samples;

import com.tdd.PricingRules;
import com.tdd.rules.*;
import com.tdd.rules.cross.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.cross.CrossSkuBuyXGetYFree;

import java.util.List;
import java.util.Map;

public class DefaultRules implements SampleRulesBuilder {

    private DefaultRules () {}

    public static PricingRules build() {

        Map<String, List<PricingOption>> options = Map.of(
                "A", List.of(
                        new SpecialPrice(3, 130, 1, true)
                ),
                "B", List.of(
                        new SpecialPrice(2, 40, 1,false)
                ),
                "C", List.of(),
                "D", List.of()
        );

        List<CrossSkuBuyXGetYFree> freeRules = List.of();

        List<CrossSkuBuyXGetYDiscount> discountRules = List.of();

        List<SkuDiscount> skuDiscounts = List.of();

        return new PricingRules(DEFAULT_UNIT_PRICES, options, freeRules, discountRules, skuDiscounts);
    }
}