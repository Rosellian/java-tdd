package com.tdd.api.pricing.conversion;

import com.tdd.PricingRules;
import com.tdd.api.prices.PriceRegistry;
import com.tdd.api.prices.data.Price;
import com.tdd.api.prices.data.PriceList;
import com.tdd.api.pricing.conversion.converters.ConvertedRules;
import com.tdd.api.pricing.rest.PricingRequest;
import com.tdd.api.rulesets.RulesetRegistry;
import com.tdd.api.rulesets.data.Ruleset;
import org.springframework.stereotype.Service;

import java.util.Map;
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
        String priceListName = request.priceList();
        String rulesetName = request.ruleset();
        PricingRules pricingRules = new PricingRules(rulesetName, priceListName);

        Map<String, Double> prices = addPrices(pricingRules, priceListName);

        converter = new RulesConverter(prices);

        addRules(pricingRules, rulesetName);

        return pricingRules;
    }

    private Map<String, Double> addPrices(PricingRules pricingRules, String priceListName) {
        Map<String, Double> prices = getPrices(priceListName);
        pricingRules.setUnitPrices(prices);

        return prices;
    }

    private Map<String, Double> getPrices(String priceListName) {
        PriceList priceList = prices.get(priceListName);

        return priceList.unitPrices().stream()
                .collect(Collectors.toMap(Price::sku, Price::price));
    }

    private void addRules(PricingRules pricingRules, String rulesetName) {
        Ruleset ruleset = rulesets.get(rulesetName);

        ConvertedRules convertedRules = converter.convertRules(ruleset);
        addConvertedRules(pricingRules, convertedRules);
    }

    private void addConvertedRules(PricingRules pricingRules, ConvertedRules convertedRules) {
        pricingRules.setPricingOptions(convertedRules.options());
        pricingRules.setSkuDiscounts(convertedRules.skuDiscounts());
        pricingRules.setCrossSkuRules(convertedRules.crossSkuRules());
    }
}
