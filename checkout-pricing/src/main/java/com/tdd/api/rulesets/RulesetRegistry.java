package com.tdd.api.rulesets;

import com.tdd.PricingRules;
import com.tdd.api.rulesets.samples.CampaignARules;
import com.tdd.api.rulesets.samples.CampaignBRules;
import com.tdd.api.rulesets.samples.DefaultRules;
import com.tdd.api.rulesets.samples.NoCrossNoSkuDiscount;

public class RulesetRegistry {

    public static PricingRules get(String name) {
        return switch (name) {
            case "campaignA" -> CampaignARules.build();
            case "campaignB" -> CampaignBRules.build();
            case "NoCrossNoSkuDiscount" -> NoCrossNoSkuDiscount.build();
            default -> DefaultRules.build();
        };
    }
}