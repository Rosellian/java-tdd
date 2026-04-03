package com.tdd.api.samples;

import com.tdd.PricingRules;
import com.tdd.rules.*;

import java.util.List;
import java.util.Map;

import static com.tdd.api.samples.Ruleset.defaultUnitPricesWithChange;

public class CampaignBRules implements Ruleset {

    public static PricingRules build() {
        Map<String, Integer> unitPrices = defaultUnitPricesWithChange("E", 60);

        Map<String, List<PricingOption>> options = Map.of(
                "A", List.of(
                        new SpecialPrice(3, 130, 1, true),  //3-for-130
                        new SpecialPrice(6, 240, 1, true)   //6-for-240
                ),
                "B", List.of(
                        new SpecialPrice(2, 40, 1,false)    // 2-for-40
                ),
                "C", List.of(
                        new SpecialPrice(5, 100, 1, true)   // 5-for-100
                ),
                "D", List.of(),
                "E", List.of(
                        new SpecialPrice(2, 90, 1, true)   // 2-for-90
                )
        );

        List<CrossSkuBuyXGetYFree> freeRules = List.of(
                new CrossSkuBuyXGetYFree(
                        "E", 2,
                        "A", 1,
                        20,
                        false
                )
        );

        List<CrossSkuBuyXGetYDiscount> discountRules = List.of(
                new CrossSkuBuyXGetYDiscount(
                        "A", 3,
                        "B", 1,
                        0.25, // 25% off B
                        15,
                        true
                )
        );

        List<SkuDiscount> skuDiscounts = List.of(
                new SkuDiscount("D", 0.20, 1), // 20% off D
                new SkuDiscount("E", 0.10, 2)  // 10% off E
        );

        return new PricingRules(unitPrices, options, freeRules, discountRules, skuDiscounts);
    }
}