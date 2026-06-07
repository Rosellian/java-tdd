package com.tdd.api.pricing.conversion;

import com.tdd.api.pricing.conversion.converters.ConvertedRules;
import com.tdd.api.rulesets.data.Ruleset;
import com.tdd.api.rulesets.data.rules.Rule;
import com.tdd.api.rulesets.data.rules.cross.CrossSkuRule;
import com.tdd.api.rulesets.data.rules.sku.SkuDiscount;
import com.tdd.api.rulesets.data.rules.sku.SkuRule;
import com.tdd.rules.PricingOption;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.tdd.api.pricing.conversion.converters.CrossSkuRuleConverter.convert;
import static com.tdd.api.pricing.conversion.converters.PricingOptionConverter.convertToPricingOptions;
import static com.tdd.api.pricing.conversion.converters.SkuDiscounterConverter.convertSkuDiscounts;

public class RulesConverter {

    public static ConvertedRules convertRules(Ruleset ruleset, Map<String, Double> prices) {
        Map<String, List<PricingOption>> options = new HashMap<>();
        List<com.tdd.rules.SkuDiscount> skuDiscounts = new ArrayList<>();
        List<com.tdd.rules.cross.CrossSkuRule> crossSkuRules = new ArrayList<>();

        Map<RuleGroup, List<Rule>> rulesByClass = ruleset.rules().stream()
                .collect(Collectors.groupingBy(RulesConverter::classify));

        for(var entry : rulesByClass.entrySet()) {
            List<Rule> rules = entry.getValue();

            switch (entry.getKey()) {
                case SKU_DISCOUNT:
                    skuDiscounts = convertSkuDiscounts(rules);
                    break;
                case CROSS_SKU_RULE:
                    crossSkuRules = convertCrossSkuRules(rules);
                    break;
                default:
                    options = convertSkuRules(rules, prices);
            }
        }

        return new ConvertedRules(options, skuDiscounts, crossSkuRules);
    }

    private static List<com.tdd.rules.cross.CrossSkuRule> convertCrossSkuRules(List<Rule> rules) {
        List<CrossSkuRule> crossSkuRules = rules.stream()
                .map(rule -> (CrossSkuRule) rule)
                .toList();

        return convert(crossSkuRules);
    }

    private static Map<String, List<PricingOption>> convertSkuRules(List<Rule> rules, Map<String, Double> unitPrices) {
        List<SkuRule> skuRules = rules.stream()
                .map(rule -> (SkuRule) rule)
                .toList();

        return convertToPricingOptions(skuRules, unitPrices);
    }

    public enum RuleGroup {
        SKU_DISCOUNT,
        TO_PRICING_OPTION,
        CROSS_SKU_RULE
    }

    private static RuleGroup classify(Rule rule) {
        if (rule instanceof SkuDiscount) {
            return RuleGroup.SKU_DISCOUNT;
        }
        if (rule instanceof CrossSkuRule) {
            return RuleGroup.CROSS_SKU_RULE;
        }
        return RuleGroup.TO_PRICING_OPTION;
    }
}
