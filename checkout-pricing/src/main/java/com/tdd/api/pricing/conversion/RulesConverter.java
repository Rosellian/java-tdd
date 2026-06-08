package com.tdd.api.pricing.conversion;

import com.tdd.api.pricing.conversion.converters.ConvertedRules;
import com.tdd.api.rulesets.data.Ruleset;
import com.tdd.api.rulesets.data.rules.Rule;
import com.tdd.api.rulesets.data.rules.cross.CrossSkuRule;
import com.tdd.api.rulesets.data.rules.sku.SkuRule;
import com.tdd.rules.PricingOption;

import java.util.List;
import java.util.Map;

import static com.tdd.api.pricing.conversion.RuleGroup.*;
import static com.tdd.api.pricing.conversion.converters.CrossSkuRuleConverter.convert;
import static com.tdd.api.pricing.conversion.converters.PricingOptionConverter.convertToPricingOptions;
import static com.tdd.api.pricing.conversion.converters.SkuDiscounterConverter.convertSkuDiscounts;
import static java.util.stream.Collectors.groupingBy;

public class RulesConverter {
    private final Map<String, Double> prices;

    public RulesConverter(Map<String, Double> prices) {
        this.prices = prices;
    }

    public ConvertedRules convertRules(Ruleset ruleset) {
        Map<RuleGroup, List<Rule>> rulesByGroup = ruleset.rules().stream()
                .collect(groupingBy(RuleGroup::classify));

        Map<String, List<PricingOption>> options = convertSkuRules(rulesByGroup);

        List<com.tdd.rules.SkuDiscount> skuDiscounts = convertSkuDiscounts(rulesByGroup);

        List<com.tdd.rules.cross.CrossSkuRule> crossSkuRules = convertCrossSkuRules(rulesByGroup);

        return new ConvertedRules(options, skuDiscounts, crossSkuRules);
    }

    private Map<String, List<PricingOption>> convertSkuRules(Map<RuleGroup, List<Rule>> rulesByGroup) {
        List<Rule> pricingOptionGroup = rulesByGroup.getOrDefault(TO_PRICING_OPTION, List.of());

        List<SkuRule> skuRules = pricingOptionGroup.stream()
                .map(rule -> (SkuRule) rule)
                .toList();

        return skuRules.isEmpty() ? Map.of() : convertToPricingOptions(skuRules, prices);
    }

    private List<com.tdd.rules.cross.CrossSkuRule> convertCrossSkuRules(Map<RuleGroup, List<Rule>> rulesByGroup) {
        List<Rule> crossSkuGroup = rulesByGroup.getOrDefault(CROSS_SKU_RULE, List.of());

        List<CrossSkuRule> crossSkuRules = crossSkuGroup.stream()
                .map(rule -> (CrossSkuRule) rule)
                .toList();

        return convert(crossSkuRules);
    }
}
