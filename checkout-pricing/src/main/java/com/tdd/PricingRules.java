package com.tdd;

import com.tdd.rules.*;
import com.tdd.rules.cross.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.cross.CrossSkuBuyXGetYFree;
import com.tdd.rules.cross.CrossSkuRule;

import java.util.*;

public class PricingRules {
    private String ruleset;
    private String priceList;
    private Map<String, Double> unitPrices = new HashMap<>();
    private Map<String, List<PricingOption>> options = new HashMap<>();
    private List<SkuDiscount> skuDiscounts = new ArrayList<>();
    private List<CrossSkuRule> crossSku = new ArrayList<>();

    public PricingRules(Map<String, Double> unitPrices, Map<String, List<PricingOption>> options,
                        List<CrossSkuBuyXGetYFree> freeRules, List<CrossSkuBuyXGetYDiscount> discountRules,
                        List<SkuDiscount> skuDiscounts) {
        this.unitPrices = unitPrices;
        this.options = options;
        this.skuDiscounts = skuDiscounts;
        this.crossSku.addAll(freeRules);
        this.crossSku.addAll(discountRules);
    }

    public PricingRules(Map<String, Double> unitPrices) {
        this.unitPrices = unitPrices;
    }

    public PricingRules(String ruleset, String priceList) {
        this.ruleset = ruleset;
        this.priceList = priceList;
    }

    public PricingRules() {}

    /* Get and set methods */

    public String getRuleset() {
        return ruleset;
    }
    public void setRuleset(String name) {
        this.ruleset = name;
    }

    public String getPriceList() {
        return priceList;
    }
    public void setPriceList(String name) {
        this.priceList = name;
    }

    public Map<String, Double> getUnitPrices() {
        return unitPrices;
    }
    public double getUnitPrice(String sku) {
        return unitPrices.get(sku);
    }
    public void setUnitPrices(Map<String, Double> unitPrices) {
        this.unitPrices = unitPrices;
    }

    public List<PricingOption> getPricingOptions(String sku) {
        List<PricingOption> skuOptions = new ArrayList<>(options.getOrDefault(sku, new ArrayList<>()));

        skuOptions.sort(Comparator.comparingInt(PricingOption::priority));

        return skuOptions;
    }
    public void setPricingOptions(Map<String, List<PricingOption>> options) {
        this.options = options;
    }

    public List<CrossSkuRule> getCrossSkuRules() {
        return crossSku;
    }
    public void setCrossSkuRules(List<CrossSkuRule> crossSku) {
        this.crossSku = crossSku;
    }

    public List<SkuDiscount> getSkuDiscounts() {return skuDiscounts;}
    public void setSkuDiscounts(List<SkuDiscount> skuDiscounts) {
        this.skuDiscounts = skuDiscounts;
    }

    /* Single rule and price add methods */

    public void addUnitPrice(String sku, double price) {
        unitPrices.put(sku, price);
    }

    public void addSpecialPrice(String sku, int quantity, double price, int priority, boolean stackable) {
        options.computeIfAbsent(sku, _ -> new ArrayList<>())
                .add(new SpecialPrice(quantity, price, priority, stackable));
    }

    public void addSkuDiscount(String sku, double discount, int priority) {
        skuDiscounts.add(new SkuDiscount(sku, discount, priority));
    }

    public void addBuyXGetYFree(String sku, int buy, int free, int priority, boolean stackable) {
        options.computeIfAbsent(sku, _ -> new ArrayList<>())
                .add(BuyXGetYFree.from(buy, free, getUnitPrice(sku), priority, stackable));
    }

    public void addBuyXGetYDiscount(String sku, int buy, int get, double discount, int priority, boolean stackable) {
        options.computeIfAbsent(sku, _ -> new ArrayList<>())
                .add(BuyXGetYDiscount.from(buy, get, getUnitPrice(sku), discount, priority, stackable));
    }

    public void addCrossSkuBuyXGetYFree(String buySku, int buyQuantity, String freeSku, int freeQuantity,
                                        int priority, boolean stackable) {
        crossSku.add(new CrossSkuBuyXGetYFree(buySku, buyQuantity, freeSku, freeQuantity, priority, stackable));
    }

    public void addCrossSkuBuyXGetYDiscount(String buySku, int buyQty, String discountSku, int discountQty,
                                            double discount, int priority, boolean stackable) {
        crossSku.add(new CrossSkuBuyXGetYDiscount(buySku, buyQty, discountSku, discountQty, discount,
                priority, stackable));
    }

    @Override
    public String toString() {
        return "PricingRules{" +
                "ruleset='" + ruleset + '\'' +
                ", priceList='" + priceList + '\'' +
                ", unitPrices=" + unitPrices +
                ", options=" + options +
                ", skuDiscounts=" + skuDiscounts +
                ", crossSku=" + crossSku +
                '}';
    }
}
