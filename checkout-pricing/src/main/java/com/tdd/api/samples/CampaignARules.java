package com.tdd.api.samples;

import com.tdd.PricingRules;
import com.tdd.rules.*;

import java.util.List;
import java.util.Map;

public class CampaignARules implements Ruleset {

    public static PricingRules build() {

        Map<String, List<PricingOption>> options = Map.of(
                "A", List.of(
                        new SpecialPrice(3, 120, 1, true),   // better deal than default
                        new SpecialPrice(5, 180, 1, true)    // 5-for-180
                ),
                "B", List.of(
                        new BuyXGetYFree(2, 40, 2, false)    // buy one, get one free
                ),
                "C", List.of(
                        new SpecialPrice(4, 70, 1, true)     // 4-for-70
                ),
                "D", List.of()
        );

        List<CrossSkuBuyXGetYFree> freeRules = List.of(
                new CrossSkuBuyXGetYFree(
                        "A", 2,
                        "C", 1,
                        10,   // priority
                        true  // stackable
                )
        );

        List<CrossSkuBuyXGetYDiscount> discountRules = List.of(
                new CrossSkuBuyXGetYDiscount(
                        "B", 2,
                        "D", 1,
                        0.50, // 50% off D
                        5,
                        false
                )
        );

        List<SkuDiscount> skuDiscounts = List.of(
                new SkuDiscount("C", 0.10, 1)  // 10% off C
        );

        return new PricingRules(DEFAULT_UNIT_PRICES, options, freeRules, discountRules, skuDiscounts);
    }
}