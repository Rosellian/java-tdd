package com.tdd.api.pricing.conversion;

import com.tdd.api.rulesets.data.rules.Rule;
import com.tdd.api.rulesets.data.rules.cross.CrossSkuRule;
import com.tdd.api.rulesets.data.rules.sku.SkuDiscount;

public enum RuleGroup {
        SKU_DISCOUNT,
        TO_PRICING_OPTION,
        CROSS_SKU_RULE;

    public static RuleGroup classify(Rule rule) {
        if (rule instanceof SkuDiscount) {
            return RuleGroup.SKU_DISCOUNT;
        }
        if (rule instanceof CrossSkuRule) {
            return RuleGroup.CROSS_SKU_RULE;
        }
        return RuleGroup.TO_PRICING_OPTION;
    }
}