package com.tdd.api.pricing.conversion.converters;

import com.tdd.api.rulesets.data.rules.Rule;
import com.tdd.rules.SkuDiscount;

import java.util.List;

import static java.util.stream.Collectors.toList;

public class SkuDiscounterConverter {

    private SkuDiscounterConverter() {}

    public static List<SkuDiscount> convertSkuDiscounts(List<Rule> rules) {
        return rules.stream().map(ruleData -> {
                    var skuDiscountData = (com.tdd.api.rulesets.data.rules.sku.SkuDiscount) ruleData;

                    return new SkuDiscount(skuDiscountData.getSku(), skuDiscountData.getDiscount(),
                            skuDiscountData.getPriority());
                })
                .collect(toList());
    }
}
