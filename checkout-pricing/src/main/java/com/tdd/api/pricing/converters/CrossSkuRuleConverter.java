package com.tdd.api.pricing.converters;

import com.tdd.api.rulesets.data.rules.cross.CrossSkuBuyXGetYDiscount;
import com.tdd.api.rulesets.data.rules.cross.CrossSkuBuyXGetYFree;
import com.tdd.api.rulesets.data.rules.cross.CrossSkuRule;

import java.util.List;

import static java.util.stream.Collectors.toList;

public class CrossSkuRuleConverter {

    public static List<com.tdd.rules.cross.CrossSkuRule> convert(List<CrossSkuRule> rules) {
        return rules.stream()
                .map(ruleData -> ruleData instanceof CrossSkuBuyXGetYFree ?
                        toInternal((CrossSkuBuyXGetYFree)ruleData) :
                        toInternal((CrossSkuBuyXGetYDiscount)ruleData))
                .collect(toList());
    }

    private static com.tdd.rules.cross.CrossSkuBuyXGetYFree toInternal(CrossSkuBuyXGetYFree ruleData) {
        return new com.tdd.rules.cross.CrossSkuBuyXGetYFree(ruleData.getBuySku(), ruleData.getBuyQty(),
                ruleData.getFreeSku(), ruleData.getFreeQty(), ruleData.getPriority(), ruleData.isStackable());
    }

    private static com.tdd.rules.cross.CrossSkuBuyXGetYDiscount toInternal(CrossSkuBuyXGetYDiscount ruleData) {
        return new com.tdd.rules.cross.CrossSkuBuyXGetYDiscount(ruleData.getBuySku(), ruleData.getBuyQty(),
                ruleData.getDiscountSku(), ruleData.getDiscountQty(), ruleData.getDiscount(),
                ruleData.getPriority(), ruleData.isStackable());
    }
}
