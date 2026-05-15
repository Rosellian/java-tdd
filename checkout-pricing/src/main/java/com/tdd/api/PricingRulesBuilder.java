package com.tdd.api;

import com.tdd.PricingRules;
import com.tdd.api.prices.PriceRegistry;
import com.tdd.api.rulesets.RulesetRegistry;
import com.tdd.api.samples.CampaignARules;
import com.tdd.api.samples.CampaignBRules;
import com.tdd.api.samples.DefaultRules;
import com.tdd.api.samples.NoCrossNoSkuDiscount;

public class PricingRulesBuilder {
    private final RulesetRegistry rulesets;
    private final PriceRegistry prices;

    public PricingRulesBuilder(RulesetRegistry rulesets, PriceRegistry prices) {
        this.rulesets = rulesets;
        this.prices = prices;
    }

    public static PricingRules getSample(String name) {
        return switch (name) {
            case "campaignA" -> CampaignARules.build();
            case "campaignB" -> CampaignBRules.build();
            case "NoCrossNoSkuDiscount" -> NoCrossNoSkuDiscount.build();
            default -> DefaultRules.build();
        };
    }
}
