package com.tdd.api.samples;

import com.tdd.PricingRules;
import com.tdd.rules.*;
import com.tdd.rules.cross.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.cross.CrossSkuBuyXGetYFree;

import java.util.List;
import java.util.Map;

import static com.tdd.api.samples.Ruleset.defaultUnitPricesWithChange;

public class NoCrossNoSkuDiscount implements Ruleset {

    public static PricingRules build() {
        Map<String, Double> unitPrices = defaultUnitPricesWithChange("C", 30);

        Map<String, List<PricingOption>> options = Map.of(
                "A", List.of(
                        new SpecialPrice(3, 120, 1, true), // 3-for-120
                        BuyXGetYFree.from(2, 1, unitPrices.get("A"), 2, true)
                        // buy 2, get 1 free
                ),
                "B", List.of(
                        new SpecialPrice(2, 70, 1, true), // 2-for-70
                        // buy 1, get 1 free
                        BuyXGetYFree.from(1, 1, unitPrices.get("B"), 2, false)
                ),
                "C", List.of(
                        // buy 2, get 1 at 50%
                        BuyXGetYDiscount.from(2, 1, unitPrices.get("C"), 0.5,1, true)
                )
        );

        List<CrossSkuBuyXGetYFree> freeRules = List.of();
        List<CrossSkuBuyXGetYDiscount> discountRules = List.of();

        List<SkuDiscount> skuDiscounts = List.of();

        return new PricingRules(unitPrices, options, freeRules, discountRules, skuDiscounts);
    }
}
