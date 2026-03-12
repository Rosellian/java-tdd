package com.tdd;

import com.tdd.rules.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.CrossSkuBuyXGetYFree;
import com.tdd.rules.CrossSkuRule;
import com.tdd.rules.SkuDiscount;

import java.util.Comparator;
import java.util.List;

public class RuleEngine {
    private final PricingRules rules;
    private final RuleEvaluator evaluator;

    public RuleEngine(PricingRules rules) {
        this.rules = rules;
        this.evaluator = new RuleEvaluator(rules);
    }

    public RuleContext evaluate(RuleContext context) {
        RuleContext next = context;

        next = applyCrossSkuRules(next);

        return applySkuDiscount(next);
    }

    private RuleContext applyCrossSkuRules(RuleContext context) {
        for (var rule : getOrderedCrossSkuRules()) {
            RuleResult result = switch(rule) {
                case CrossSkuBuyXGetYFree free -> evaluator.apply(free, context);
                case CrossSkuBuyXGetYDiscount discount -> evaluator.apply(discount, context);
                default -> throw new IllegalStateException("Unexpected value: " + rule);
            };

            if(result.applied()) return result.newContext();
        }
        return context;
    }

    private RuleContext applySkuDiscount(RuleContext context) {
        RuleContext next = context;

        for(var rule : getSkuDiscounts()) {
            RuleResult result = evaluator.apply(rule, next);
            if(result.applied())
                next = result.newContext();
        }
        return next;
    }

    public List<CrossSkuRule> getOrderedCrossSkuRules() {
        return rules.getCrossSkuRules().stream()
                .sorted(Comparator.comparingInt(CrossSkuRule::priority))
                .toList();
    }

    public List<SkuDiscount> getSkuDiscounts() {return rules.getSkuDiscounts();}
}
