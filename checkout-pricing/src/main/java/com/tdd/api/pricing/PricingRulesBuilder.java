package com.tdd.api.pricing;

import com.tdd.PricingRules;
import com.tdd.api.prices.PriceRegistry;
import com.tdd.api.prices.data.Price;
import com.tdd.api.prices.data.PriceList;
import com.tdd.api.pricing.converters.ConvertedRules;
import com.tdd.api.rest.trace.PricingRequest;
import com.tdd.api.rulesets.RulesetRegistry;
import com.tdd.api.rulesets.data.Ruleset;
import com.tdd.api.samples.CampaignARules;
import com.tdd.api.samples.CampaignBRules;
import com.tdd.api.samples.DefaultRules;
import com.tdd.api.samples.NoCrossNoSkuDiscount;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.stream.Collectors;

import static com.tdd.api.pricing.RulesConverter.convertRules;

@Service
public class PricingRulesBuilder {
    private final RulesetRegistry rulesets;
    private final PriceRegistry prices;

    public PricingRulesBuilder(RulesetRegistry rulesets, PriceRegistry prices) {
        this.rulesets = rulesets;
        this.prices = prices;
    }

    public PricingRules from(PricingRequest request) {
        String priceListName = request.getPriceList();
        String rulesetName = request.getRuleset();
        PricingRules pricingRules = new PricingRules(rulesetName, priceListName);

        Map<String, Double> prices = getPrices(priceListName);
        pricingRules.setUnitPrices(prices);

        Ruleset ruleset = rulesets.get(rulesetName);

        ConvertedRules convertedRules = convertRules(ruleset, prices);
        addRules(pricingRules, convertedRules);

        return pricingRules;
    }

    private void addRules(PricingRules pricingRules, ConvertedRules convertedRules) {
        pricingRules.setPricingOptions(convertedRules.options());
        pricingRules.setSkuDiscounts(convertedRules.skuDiscounts());
        pricingRules.setCrossSkuRules(convertedRules.crossSkuRules());
    }

    private Map<String, Double> getPrices(String priceListName) {
        PriceList priceList = prices.get(priceListName);

        return priceList.unitPrices().stream()
                .collect(Collectors.toMap(Price::sku, Price::price));
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
