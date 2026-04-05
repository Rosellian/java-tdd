package com.tdd.rulesets;

import com.tdd.PricingRules;
import com.tdd.api.samples.Ruleset;
import com.tdd.rules.cross.CrossSkuBuyXGetYFree;
import com.tdd.rules.PricingOption;
import com.tdd.rules.SpecialPrice;

import java.util.List;
import java.util.Map;

import static java.util.Collections.emptyList;

public class CrossSkuBeatsSpecialPriceWhenHigherPriority implements Ruleset {

    public static PricingRules build() {
        Map<String, List<PricingOption>> options = Map.of(
                "A", List.of(new SpecialPrice(3, 120, 1, true)),
                "B", List.of(new SpecialPrice(2, 70, 1, true))
        );

        List<CrossSkuBuyXGetYFree> freeRules = List.of(
                new CrossSkuBuyXGetYFree("A",2,"B", 1,0, true)
        );

        return new PricingRules(DEFAULT_UNIT_PRICES, options, freeRules, emptyList(), emptyList());
    }
}
