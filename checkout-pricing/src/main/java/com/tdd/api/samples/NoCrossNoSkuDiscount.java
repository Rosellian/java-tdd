package com.tdd.api.samples;

import com.tdd.PricingRules;
import com.tdd.rules.*;
import com.tdd.rules.cross.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.cross.CrossSkuBuyXGetYFree;

import java.util.List;
import java.util.Map;

import static com.tdd.api.samples.Ruleset.defaultUnitPricesWithChange;
import static com.tdd.rules.BuyXGetYDiscount.calculatePrice;

public class NoCrossNoSkuDiscount implements Ruleset {

    public static PricingRules build() {
        Map<String, Double> unitPrices = defaultUnitPricesWithChange("C", 30);

        Map<String, List<PricingOption>> options = Map.of(
                "A", List.of(
                        new SpecialPrice(3, 120, 1, true), // 3-for-120
                        new BuyXGetYFree(3, 2 * unitPrices.get("A"), 2, true)
                        // buy 2, get 1 free
                ),
                "B", List.of(
                        new SpecialPrice(2, 70, 1, true), // 2-for-70
                        new BuyXGetYFree(2, unitPrices.get("B"), 2, false) // buy 1, get 1 free
                ),
                "C", List.of(
                        new BuyXGetYDiscount(3,
                                calculatePrice(2, unitPrices.get("C"), 1, 0.5),
                                1, true) // buy 2, get 1 at 50%
                )
        );

        List<CrossSkuBuyXGetYFree> freeRules = List.of();
        List<CrossSkuBuyXGetYDiscount> discountRules = List.of();

        List<SkuDiscount> skuDiscounts = List.of();

        return new PricingRules(unitPrices, options, freeRules, discountRules, skuDiscounts);
    }
}
