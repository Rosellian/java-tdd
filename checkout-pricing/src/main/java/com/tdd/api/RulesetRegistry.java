package com.tdd.api;

import com.tdd.PricingRules;
import com.tdd.api.samples.CampaignARules;
import com.tdd.api.samples.CampaignBRules;
import com.tdd.api.samples.DefaultRules;
import com.tdd.api.samples.NoCrossNoSkuDiscount;

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