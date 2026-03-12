package com.tdd;

import com.tdd.rules.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.CrossSkuBuyXGetYFree;
import com.tdd.rules.SkuDiscount;

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
        long originalBuy = next.countOf(buySku);
        long originalFree = next.countOf(freeSku);

        boolean applied = false;
        while(next.countOf(buySku) >= buyQty && next.countOf(freeSku) >= freeQty) {
            applied = true;
            next.counts().put(buySku, next.countOf(buySku) - buyQty);

            next.counts().put(freeSku, next.countOf(freeSku) - freeQty);
            next.mods().merge(freeSku, new SkuMod(freeQty, 0, 1.0), (oldMod, newMod)
                    -> new SkuMod(oldMod.free() + newMod.free(), oldMod.discounted(), 1.0));

            if(!rule.stackable()) break;
        }

        next.counts().put(buySku, originalBuy);
        next.counts().put(freeSku, originalFree);
        return new RuleResult(applied, next);
    }

    @Override
    public RuleResult apply(CrossSkuBuyXGetYDiscount rule, RuleContext context) {
        String buySku = rule.buySku();
        String discountSku = rule.discountSku();
        if(skuDiscountHasHigherPriorityFor(discountSku, rule.priority())) {
            return new RuleResult(false, context);
        }

        int buyQty = rule.buyQty();
        int discountQty = rule.discountQty();
        RuleContext next = context.copy();
        long originalBuy = next.countOf(buySku);
        long originalDiscount = next.countOf(discountSku);

        boolean applied = false;
        while(next.countOf(buySku) >= buyQty && next.countOf(discountSku) >= discountQty) {
            next.counts().put(buySku, next.countOf(buySku) - buyQty);
            applied = true;

            next.counts().put(discountSku, next.countOf(discountSku) - discountQty);
            next.mods().merge(discountSku, new SkuMod(0, discountQty, rule.discount()),
                    (oldMod, newMod) -> new SkuMod(
                            oldMod.free(),
                            oldMod.discounted() + newMod.discounted(),
                            Math.min(oldMod.rate(), newMod.rate()))
            );

            if(!rule.stackable()) break;
        }

        next.counts().put(buySku, originalBuy);
        next.counts().put(discountSku, originalDiscount);
        return new RuleResult(applied, next);
    }

    @Override
    public RuleResult apply(SkuDiscount rule, RuleContext context) {
        RuleContext next = context.copy();
        SkuMod skuMod = context.modOf(rule.sku());

        if(skuMod != null && (skuMod.free() > 0 || skuMod.discounted() > 0)) {
            return new RuleResult(false, context);
        }

        next.mods().put(rule.sku(), new SkuMod(0, 1, 1-rule.discount()));
        return new RuleResult(true, next);
    }

    private boolean skuDiscountHasHigherPriorityFor(String sku, int crossSkuRulePriority) {
        return rules.getSkuDiscounts().stream()
                .anyMatch(r -> r.sku().equals(sku) && r.priority() < crossSkuRulePriority);
    }
}
