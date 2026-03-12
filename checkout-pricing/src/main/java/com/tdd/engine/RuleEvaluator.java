package com.tdd.engine;

import com.tdd.PricingRules;
import com.tdd.rules.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.CrossSkuBuyXGetYFree;
import com.tdd.rules.SkuDiscount;

import java.util.Map;

public class RuleEvaluator implements IRuleEvaluator {
    private final PricingRules rules;

    public RuleEvaluator(PricingRules rules) {
        this.rules = rules;
    }

    @Override
    public RuleDelta apply(CrossSkuBuyXGetYFree rule, RuleContext context) {
        String freeSku = rule.freeSku();

        long times = Math.min(context.countOf(rule.buySku()) / rule.buyQty(),
                context.countOf(rule.freeSku()) / rule.freeQty());

        if(times == 0) return RuleDelta.none();
        if(!rule.stackable()) times = 1;

        int totalFree = (int) (times * rule.freeQty());
        return new RuleDelta(Map.of(freeSku, new SkuMod(totalFree, 0, 1.0)), true);
    }

    @Override
    public RuleDelta apply(CrossSkuBuyXGetYDiscount rule, RuleContext context) {
        String discountSku = rule.discountSku();

        long times = Math.min(context.countOf(rule.buySku()) / rule.buyQty(),
                context.countOf(discountSku) / rule.discountQty());

        if(skuDiscountHasHigherPriorityFor(discountSku, rule.priority()) || times == 0) {
            return RuleDelta.none();
        }
        if(!rule.stackable()) times = 1;

        int totalDiscounted = (int) (rule.discountQty() * times);
        return new RuleDelta(Map.of(discountSku,
                new SkuMod(0, totalDiscounted, rule.discount())), true);
    }

    @Override
    public RuleDelta apply(SkuDiscount rule, RuleContext context) {
        SkuMod mod = context.modOf(rule.sku());

        if((mod.free() > 0 || mod.discounted() > 0)) {
            return RuleDelta.none();
        }

        return new RuleDelta(
                Map.of(rule.sku(), new SkuMod(0, 1, 1 - rule.discount())),
                true);
    }

    private boolean skuDiscountHasHigherPriorityFor(String sku, int crossSkuRulePriority) {
        return rules.getSkuDiscounts().stream()
                .anyMatch(r -> r.sku().equals(sku) && r.priority() < crossSkuRulePriority);
    }
}
