package com.tdd.api.pricing.conversion;

import com.tdd.PricingRules;
import com.tdd.api.prices.PriceRegistry;
import com.tdd.api.prices.data.Price;
import com.tdd.api.prices.data.PriceList;
import com.tdd.api.prices.data.PriceListEntry;
import com.tdd.api.pricing.conversion.converters.ConvertedRules;
import com.tdd.api.pricing.rest.PricingRequest;
import com.tdd.api.rulesets.RulesetRegistry;
import com.tdd.api.rulesets.data.Ruleset;
import com.tdd.api.rulesets.data.RulesetEntry;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PricingRulesBuilder {
    private final RulesetRegistry rulesets;
    private final PriceRegistry prices;
    private RulesConverter converter;

    public PricingRulesBuilder(RulesetRegistry rulesets, PriceRegistry prices) {
        this.rulesets = rulesets;
        this.prices = prices;
    }

    public PricingRules from(PricingRequest request) {
        RulesetEntry ruleset = request.ruleset();
        PriceListEntry priceList = request.priceList();
        PricingRules pricingRules = new PricingRules(ruleset.name(), priceList.name());

        Map<String, Double> prices = addPrices(pricingRules, priceList.id());

        converter = new RulesConverter(prices);

        addRules(pricingRules, ruleset.id());

        return pricingRules;
    }

    private Map<String, Double> addPrices(PricingRules pricingRules, UUID priceListID) {
        Map<String, Double> prices = getPrices(priceListID);
        pricingRules.setUnitPrices(prices);

        return prices;
    }

    private Map<String, Double> getPrices(UUID priceListID) {
        PriceList priceList = prices.get(priceListID);

        return priceList.unitPrices().stream()
                .collect(Collectors.toMap(Price::sku, Price::price));
    }

    private void addRules(PricingRules pricingRules, UUID rulesetID) {
        Ruleset ruleset = rulesets.get(rulesetID);

        ConvertedRules convertedRules = converter.convertRules(ruleset);
        addConvertedRules(pricingRules, convertedRules);
    }

    private void addConvertedRules(PricingRules pricingRules, ConvertedRules convertedRules) {
        pricingRules.setPricingOptions(convertedRules.options());
        pricingRules.setSkuDiscounts(convertedRules.skuDiscounts());
        pricingRules.setCrossSkuRules(convertedRules.crossSkuRules());
    }
}
