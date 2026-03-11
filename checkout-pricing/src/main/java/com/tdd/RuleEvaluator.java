package com.tdd;

import com.tdd.rules.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.CrossSkuBuyXGetYFree;

public class RuleEvaluator implements IRuleEvaluator {
    private final PricingRules rules;

    public RuleEvaluator(PricingRules rules) {
        this.rules = rules;
    }

    @Override
    public RuleResult apply(CrossSkuBuyXGetYFree rule, RuleContext context) {
        String buySku = rule.buySku();
        String freeSku = rule.freeSku();
        int buyQty = rule.buyQty();
        int freeQty = rule.freeQty();

        RuleContext next = context.copy();

        boolean applied = false;
        while(next.countOf(buySku) >= buyQty && next.countOf(freeSku) >= freeQty) {
            applied = true;
            next.counts().put(buySku, next.countOf(buySku) - buyQty);

            next.counts().put(freeSku, next.countOf(freeSku) - freeQty);
            next.mods().merge(freeSku, new SkuMod(freeQty, 0, 1.0), (oldMod, newMod)
                    -> new SkuMod(oldMod.free() + newMod.free(), oldMod.discounted(), 1.0));

            if(!rule.stackable()) break;
        }
        return new RuleResult(applied, next);
    }

    @Override
    public boolean apply(CrossSkuBuyXGetYDiscount rule, RuleContext context) {
        String buySku = rule.buySku();
        String discountSku = rule.discountSku();
        if(skuDiscountHasHigherPriorityFor(discountSku, rule.priority())) {
            return false;
        }

        int buyQty = rule.buyQty();
        int discountQty = rule.discountQty();

        long originalBuyCount = counts.get(buySku);
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
                            Math.min(oldMod.rate(), newMod.rate()))
            );

            if(!rule.stackable()) break;
        }

        counts.put(buySku, originalBuyCount);
        counts.put(discountSku, originalDiscountCount);
        return applied;
    }

    private boolean skuDiscountHasHigherPriorityFor(String sku, int crossSkuRulePriority) {
        return rules.getSkuDiscounts().stream()
                .anyMatch(r -> r.sku().equals(sku) && r.priority() < crossSkuRulePriority);
    }
}
