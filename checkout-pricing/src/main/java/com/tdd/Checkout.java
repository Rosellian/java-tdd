package com.tdd;

import java.util.*;
import java.util.stream.Collectors;

public class Checkout {
    private final PricingRules rules;
    private final List<String> items = new ArrayList<>();

    public Checkout(PricingRules rules) {
        this.rules = rules;
    }

    public void scan(String unit) {
        items.add(unit);
    }

    private List<PricingOption> getOptionsFor(String sku) {
        List<PricingOption> options = new ArrayList<>(rules.getSpecialPrices(sku));

        addBuyXGetYDiscount(sku, options);

        addBuyXGetYFree(sku, options);

        options.sort(Comparator.comparingInt(PricingOption::priority));

        return options;
    }

    private void addBuyXGetYFree(String sku, List<PricingOption> options) {
        for(BuyXGetYFree rule : rules.getBuyXGetYFree(sku)) {
            options.add(new BuyXGetYFreeOption(rule.buy() + rule.free(),
                    rule.buy() * rules.getUnitPrice(sku), 2, rule.stackable()));
        }
    }

    private void addBuyXGetYDiscount(String sku, List<PricingOption> options) {
        for (BuyXGetYDiscount rule : rules.getBuyXGetYDiscount(sku)) {
            int unitPrice = rules.getUnitPrice(sku);
            int price = (int)(rule.buy() * unitPrice + rule.get() * unitPrice * (1-rule.discount()));
            options.add(new BuyXGetYDiscountOption(rule.buy() + rule.get(), price, 1, rule.stackable()));
        }
    }

    public int total() {
        Map<String, Long> counts = items.stream()
                .collect(Collectors.groupingBy(sku -> sku, Collectors.counting()));

        Map<String, Integer> freeItems = new HashMap<>();
        Map<String, Integer> discountedItems = new HashMap<>();
        Map<String, Double> discountRates = new HashMap<>();
        applyCrossSkuRules(counts, freeItems, discountedItems, discountRates);

        //process per SKU
        int total = 0;

        for(var entry : counts.entrySet()) {
            String sku = entry.getKey();
            long quantity = entry.getValue();

            //free
            int free = freeItems.getOrDefault(sku, 0);
            long remaining = quantity - free;
            if(remaining < 0) remaining = 0;

            //discount
            int discounted = discountedItems.getOrDefault(sku, 0);
            double rate = discountRates.getOrDefault(sku, 1.0);
            int discountedPrice = (int) (discounted * rules.getUnitPrice(sku) * rate);

            remaining = remaining - discounted;
            if(remaining < 0) remaining = 0;

            total += discountedPrice + bestPriceFor(sku, remaining);
        }

        return total;
    }

    private void applyCrossSkuRules(Map<String, Long> counts, Map<String, Integer> freeItems,
                                    Map<String, Integer> discountedItems,  Map<String, Double> discountRates) {
        List<CrossSkuRule> crossSkuRules = rules.getCrossSkuRules();
        crossSkuRules.sort(Comparator.comparingInt(CrossSkuRule::priority));
        for (var rule : crossSkuRules) {
            String buySku = rule.buySku();
            int buyQty = rule.buyQty();
            long originalBuyCount = counts.get(buySku);

            if(rule instanceof CrossSkuBuyXGetYFree)
                applyCrossSkuRule(counts, freeItems, (CrossSkuBuyXGetYFree) rule, buySku, buyQty, originalBuyCount);
            else
                applyCrossSkuRule(counts, discountedItems, discountRates, (CrossSkuBuyXGetYDiscount) rule,
                        buySku, buyQty, originalBuyCount);
        }
    }

    private void applyCrossSkuRule(Map<String, Long> counts, Map<String, Integer> freeItems,
                                          CrossSkuBuyXGetYFree rule, String buySku, int buyQty, long originalBuyCount) {
        String freeSku = rule.freeSku();
        int freeQty = rule.freeQty();
        long originalFreeCount = counts.get(freeSku);

        while(counts.get(buySku) >= buyQty && counts.get(freeSku) > 0) {
            counts.put(buySku, counts.get(buySku) - buyQty);

            counts.put(freeSku, counts.get(freeSku) - freeQty);
            freeItems.merge(freeSku, freeQty, Integer::sum);

            if(!rule.stackable()) break;
        }

        counts.put(buySku, originalBuyCount);
        counts.put(freeSku, originalFreeCount);
    }

    private void applyCrossSkuRule(Map<String, Long> counts, Map<String, Integer> discountedItems,
                                   Map<String, Double> discountRates, CrossSkuBuyXGetYDiscount rule,
                                   String buySku, int buyQty, long originalBuyCount) {
        String discountSku = rule.discountSku();
        int discountQty = rule.discountQty();
        long originalDiscountCount = counts.get(discountSku);

        while(counts.get(buySku) >= buyQty && counts.get(discountSku) > 0) {
            counts.put(buySku, counts.get(buySku) - buyQty);

            counts.put(discountSku, counts.get(discountSku) - discountQty);
            discountedItems.merge(discountSku, discountQty, Integer::sum);
            discountRates.put(discountSku, rule.discount());

            if(!rule.stackable()) break;
        }

        counts.put(buySku, originalBuyCount);
        counts.put(discountSku, originalDiscountCount);
    }

    private int bestPriceFor(String sku, long count) {
        int unitPrice = rules.getUnitPrice(sku);
        List<PricingOption> options = getOptionsFor(sku);
        Map<Long, Integer> countBestMapping = new HashMap<>();

        return bestPriceFor(count, unitPrice, options, countBestMapping);
    }

    private int bestPriceFor(long count, int unitPrice, List<PricingOption> options,
                                Map<Long, Integer> countBestMapping) {
        if(count == 0) return 0;
        if(countBestMapping.containsKey(count)) return countBestMapping.get(count);

        int best = (int) (count * unitPrice);

        for(PricingOption opt : options) {
            if(count >= opt.quantity()) {
                if(!opt.stackable()) {
                    int candidate = (int) (opt.price() + (count - opt.quantity()) * unitPrice);
                    best = Math.min(best, candidate);
                    continue;
                }
                int candidate = opt.price() + bestPriceFor(count - opt.quantity(),
                        unitPrice, options, countBestMapping);
                best = Math.min(best, candidate);
            }
        }

        countBestMapping.put(count, best);
        return best;
    }
}
