package com.tdd.api.pricing.converters;

import com.tdd.rules.PricingOption;
import com.tdd.rules.SkuDiscount;
import com.tdd.rules.cross.CrossSkuRule;

import java.util.List;
import java.util.Map;

public record ConvertedRules(
        Map<String, List<PricingOption>> options,
        List<SkuDiscount> skuDiscounts,
        List<CrossSkuRule> crossSkuRules
) {}