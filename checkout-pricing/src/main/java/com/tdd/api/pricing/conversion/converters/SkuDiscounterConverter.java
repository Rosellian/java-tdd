package com.tdd.api.pricing.conversion.converters;

import com.tdd.api.pricing.conversion.RuleGroup;
import com.tdd.api.rulesets.data.rules.Rule;
import com.tdd.rules.SkuDiscount;

import java.util.List;
import java.util.Map;

import static com.tdd.api.pricing.conversion.RuleGroup.SKU_DISCOUNT;

public class SkuDiscounterConverter {

    private SkuDiscounterConverter() {}

    public static List<SkuDiscount> convertSkuDiscounts(Map<RuleGroup, List<Rule>> rulesByGroup) {
        List<Rule> skuDiscountGroup = rulesByGroup.getOrDefault(SKU_DISCOUNT, List.of());

        return skuDiscountGroup.stream()
                .map(ruleData -> (com.tdd.api.rulesets.data.rules.sku.SkuDiscount) ruleData)
                .map(skuDiscountData -> new SkuDiscount(skuDiscountData.getSku(),
                        skuDiscountData.getDiscount(), skuDiscountData.getPriority()))
                .toList();
    }
}
