package com.tdd;

import com.tdd.rules.*;

import java.util.*;

public class PricingRules {
    private Map<String, Integer> unitPrices = new HashMap<>();
    private Map<String, List<PricingOption>> options = new HashMap<>();
    private List<SkuDiscount> skuDiscounts = new ArrayList<>();
    private final List<CrossSkuRule> crossSku = new ArrayList<>();

    public PricingRules(Map<String, Integer> unitPrices, Map<String, List<PricingOption>> options,
                        List<CrossSkuBuyXGetYFree> freeRules, List<CrossSkuBuyXGetYDiscount> discountRules,
                        List<SkuDiscount> skuDiscounts) {
        this.unitPrices = unitPrices;
        this.options = options;
        this.skuDiscounts = skuDiscounts;
        this.crossSku.addAll(freeRules);
        this.crossSku.addAll(discountRules);
    }

    public PricingRules() {}

    public PricingRules(Map<String, Integer> unitPrices) {
        this.unitPrices = unitPrices;
    }

    public void addUnitPrice(String sku, int price) {
        unitPrices.put(sku, price);
    }

    public int getUnitPrice(String sku) {
        return unitPrices.get(sku);
    }

    public void addSpecialPrice(String sku, int quantity, int price, int priority, boolean stackable) {
        options.computeIfAbsent(sku, _ -> new ArrayList<>())
                .add(new SpecialPrice(quantity, price, priority, stackable));
    }

    public void addSkuDiscount(String sku, double discount, int priority) {
        skuDiscounts.add(new SkuDiscount(sku, discount, priority));
    }

    public List<SkuDiscount> getSkuDiscounts() {return skuDiscounts;}

    public void addBuyXGetYFree(String sku, int buy, int free, int priority, boolean stackable) {
        int quantity = BuyXGetYFree.calculateQuantity(buy, free);
        int price =  BuyXGetYFree.calculatePrice(buy, getUnitPrice(sku));

        options.computeIfAbsent(sku, _ -> new ArrayList<>())
                .add(new BuyXGetYFree(quantity, price, priority, stackable));
    }

    public void addBuyXGetYDiscount(String sku, int buy, int get, double discount, int priority, boolean stackable) {
        int unitPrice = getUnitPrice(sku);
        int price = BuyXGetYDiscount.calculatePrice(buy, unitPrice, get, discount);
        int quantity = BuyXGetYDiscount.calculateQuantity(buy, get);

        options.computeIfAbsent(sku, _ -> new ArrayList<>())
                .add(new BuyXGetYDiscount(quantity, price, priority, stackable));
    }

    public List<PricingOption> getPricingOptions(String sku) {
        List<PricingOption> skuOptions = new ArrayList<>(options.getOrDefault(sku, new ArrayList<>()));

        skuOptions.sort(Comparator.comparingInt(PricingOption::priority));

        return skuOptions;
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

    public List<CrossSkuRule> getCrossSkuRules() {return crossSku;}
}
