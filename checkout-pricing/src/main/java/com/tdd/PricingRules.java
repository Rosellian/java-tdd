package com.tdd;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PricingRules {
    private final Map<String, Integer> unitPrices = new HashMap<>();
    private final Map<String, List<SpecialPrice>> specialPrices = new HashMap<>();
    private final List<SkuDiscount> discountPrices = new ArrayList<>();
    private final Map<String, List<BuyXGetYFree>> buyXGetYFree = new HashMap<>();
    private final Map<String, List<BuyXGetYDiscount>> buyXGetYDiscount = new HashMap<>();
    private final List<CrossSkuRule> crossSku = new ArrayList<>();

    public void addUnitPrice(String sku, int price) {
        unitPrices.put(sku, price);
    }

    public int getUnitPrice(String sku) {
        return unitPrices.get(sku);
    }

    public void addSpecialPrice(String sku, int quantity, int price, int priority, boolean stackable) {
        specialPrices.computeIfAbsent(sku, _ -> new ArrayList<>())
                .add(new SpecialPrice(quantity, price, priority, stackable));
    }

    public List<SpecialPrice> getSpecialPrices(String sku) {
        return specialPrices.getOrDefault(sku, new ArrayList<>());
    }

    public void addSkuDiscount(String sku, double discount, int priority) {
        discountPrices.add(new SkuDiscount(sku, discount, priority));
    }

    public List<SkuDiscount> getSkuDiscounts() {return discountPrices;}

    public void addBuyXGetYFree(String sku, int buy, int free, boolean stackable) {
        buyXGetYFree.computeIfAbsent(sku, _ -> new ArrayList<>())
                .add(new BuyXGetYFree(buy, free, stackable));
    }

    public List<BuyXGetYFree> getBuyXGetYFree(String sku) {
        return buyXGetYFree.getOrDefault(sku, new ArrayList<>());
    }

    public void addBuyXGetYDiscount(String sku, int buy, int get, double discount) {
        buyXGetYDiscount.computeIfAbsent(sku, _ -> new ArrayList<>())
                .add(new BuyXGetYDiscount(buy, get, discount, true));
    }

    public List<BuyXGetYDiscount> getBuyXGetYDiscount(String sku) {
        return buyXGetYDiscount.getOrDefault(sku, new ArrayList<>());
    }

    public void addCrossSkuBuyXGetYFree(String buySku, int buyQuantity,
                                        String freeSku, int freeQuantity, int priority, boolean stackable) {
        crossSku.add(new CrossSkuBuyXGetYFree(buySku, buyQuantity, freeSku, freeQuantity,
                priority, stackable));
    }

    public void addCrossSkuBuyXGetYDiscount(String buySku, int buyQty,
                                            String discountSku, int discountQty, double discount,
                                            int priority, boolean stackable) {
        crossSku.add(new CrossSkuBuyXGetYDiscount(buySku, buyQty, discountSku, discountQty, discount,
                priority, stackable));
    }

    public List<CrossSkuRule> getCrossSkuRules() {return  crossSku;}
}
