package com.tdd;

import com.tdd.rules.*;

import java.util.*;
import java.util.stream.Collectors;

public class Checkout {
    private final RuleEngine ruleEngine;
    private final List<String> items = new ArrayList<>();

    public Checkout(PricingRules rules) {
        ruleEngine = new RuleEngine(rules);
    }

    public void scan(String unit) {
        items.add(unit);
    }

    public int total() {
        Map<String, Long> counts = items.stream()
                .collect(Collectors.groupingBy(sku -> sku, Collectors.counting()));

        Map<String, SkuMod> mods = new HashMap<>();

        applyCrossSkuRules(counts, mods);

        for(SkuDiscount rule : ruleEngine.getSkuDiscounts()){
            SkuMod skuMod = mods.get(rule.sku());
            if(skuMod != null && (skuMod.free() > 0 || skuMod.discounted() > 0)) {
                continue;
            }
            mods.put(rule.sku(), new SkuMod(0, 1, 1-rule.discount()));
        }

        int total = 0;

        for(var entry : counts.entrySet()) {
            String sku = entry.getKey();

            SkuMod mod = mods.getOrDefault(sku, new SkuMod(0, 0, 1.0));
            long discounted = mod.discounted();

            long remaining = entry.getValue() - mod.free() - discounted;
            if(remaining < 0) remaining = 0;

            int discountedPrice = (int)(discounted * ruleEngine.getUnitPrice(sku) * mod.rate());
            total += discountedPrice + bestPriceFor(sku, remaining);
        }

        return total;
    }

    private void applyCrossSkuRules(Map<String, Long> counts, Map<String, SkuMod> mods) {
        List<CrossSkuRule> crossSkuRules = ruleEngine.getOrderedCrossSkuRules();

        for (var rule : crossSkuRules) {
            String buySku = rule.buySku();
            int buyQty = rule.buyQty();
            long originalBuyCount = counts.get(buySku);

            boolean applied = false;
            if(rule instanceof CrossSkuBuyXGetYFree)
                applied = applyCrossSkuRule(counts, mods, (CrossSkuBuyXGetYFree) rule, buySku, buyQty, originalBuyCount);
            else {
                CrossSkuBuyXGetYDiscount discountRule = (CrossSkuBuyXGetYDiscount) rule;
                if(!skuDiscountHasHigherPriorityFor(discountRule.discountSku(), rule.priority()))
                    applied = applyCrossSkuRule(counts, mods, discountRule, buySku, buyQty, originalBuyCount);
            }
            if(applied) return;
        }
    }

    private boolean skuDiscountHasHigherPriorityFor(String sku, int crossSkuPriority) {
        return rules.getSkuDiscounts().stream()
                .anyMatch(r -> r.sku().equals(sku) && r.priority() < crossSkuPriority);
    }

    private boolean applyCrossSkuRule(Map<String, Long> counts, Map<String, SkuMod> mods, CrossSkuBuyXGetYDiscount rule,
                                   String buySku, int buyQty, long originalBuyCount) {
        String discountSku = rule.discountSku();
        int discountQty = rule.discountQty();
        long originalDiscountCount = counts.get(discountSku);

        boolean applied = false;
        while(counts.get(buySku) >= buyQty && counts.get(discountSku) >= discountQty) {
            counts.put(buySku, counts.get(buySku) - buyQty);
            applied = true;

            counts.put(discountSku, counts.get(discountSku) - discountQty);
            mods.merge(discountSku, new SkuMod(0, discountQty, rule.discount()),
                    (oldMod, newMod) -> new SkuMod(
                            oldMod.free(),
                            oldMod.discounted() + newMod.discounted(),
                            Math.min(oldMod.rate(), newMod.rate())
                    )
            );

            if(!rule.stackable()) break;
        }

        counts.put(buySku, originalBuyCount);
        counts.put(discountSku, originalDiscountCount);
        return applied;
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
