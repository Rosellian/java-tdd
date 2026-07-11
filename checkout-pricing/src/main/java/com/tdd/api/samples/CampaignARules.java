package com.tdd.api.samples;

import com.tdd.PricingRules;
import com.tdd.rules.*;
import com.tdd.rules.cross.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.cross.CrossSkuBuyXGetYFree;

import java.util.List;
import java.util.Map;

public class CampaignARules implements SampleRulesBuilder {

    private CampaignARules () {}

    public static PricingRules build() {

        Map<String, List<PricingOption>> options = Map.of(
                "A", List.of(
                        new SpecialPrice(3, 120, 1, true),
                        new SpecialPrice(5, 180, 1, true)
                ),
                "B", List.of(
                        // buy one, get one free
                        BuyXGetYFree.from(1, 1, SKUs.B.unitPrice, 2, false)
                ),
                "C", List.of(
                        new SpecialPrice(4, 70, 1, true)
                ),
                "D", List.of()
        );

        List<CrossSkuBuyXGetYFree> freeRules = List.of(
                new CrossSkuBuyXGetYFree("A", 2,"C", 1,10, true)
        );

        List<CrossSkuBuyXGetYDiscount> discountRules = List.of(
                new CrossSkuBuyXGetYDiscount("B", 2,"D", 1,0.50,
                        5,false)
        );

        List<SkuDiscount> skuDiscounts = List.of(
                new SkuDiscount("C", 0.10, 1)
        );

        return new PricingRules(DEFAULT_UNIT_PRICES, options, freeRules, discountRules, skuDiscounts);
    }
}