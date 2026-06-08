package com.tdd.api.samples;

import com.tdd.PricingRules;
import com.tdd.rules.*;
import com.tdd.rules.cross.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.cross.CrossSkuBuyXGetYFree;

import java.util.List;
import java.util.Map;

import static com.tdd.api.samples.SampleRulesBuilder.defaultUnitPricesWithChange;

public class CampaignBRules implements SampleRulesBuilder {

    private CampaignBRules() {}

    public static PricingRules build() {
        Map<String, Double> unitPrices = defaultUnitPricesWithChange("E", 60);

        Map<String, List<PricingOption>> options = Map.of(
                "A", List.of(
                        new SpecialPrice(3, 130, 1, true),
                        new SpecialPrice(6, 240, 1, true)
                ),
                "B", List.of(
                        new SpecialPrice(2, 40, 1,false)
                ),
                "C", List.of(
                        new SpecialPrice(5, 100, 1, true)
                ),
                "D", List.of(),
                "E", List.of(
                        new SpecialPrice(2, 90, 1, true)
                )
        );

        List<CrossSkuBuyXGetYFree> freeRules = List.of(
                new CrossSkuBuyXGetYFree("E", 2,"A", 1,20,false)
        );

        List<CrossSkuBuyXGetYDiscount> discountRules = List.of(
                new CrossSkuBuyXGetYDiscount("A", 3,"B", 1,0.25,
                        15,true)
        );

        List<SkuDiscount> skuDiscounts = List.of(
                new SkuDiscount("D", 0.20, 1),
                new SkuDiscount("E", 0.10, 2)
        );

        return new PricingRules(unitPrices, options, freeRules, discountRules, skuDiscounts);
    }
}