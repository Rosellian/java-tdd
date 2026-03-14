package com.tdd.api;

import com.tdd.PricingRules;
import com.tdd.api.samples.CampaignARules;
import com.tdd.api.samples.CampaignBRules;
import com.tdd.api.samples.DefaultRules;

public class RuleSetRegistry {

    public static PricingRules get(String name) {
        return switch (name) {
            case "campaignA" -> CampaignARules.build();
            case "campaignB" -> CampaignBRules.build();
            default -> DefaultRules.build();
        };
    }
}