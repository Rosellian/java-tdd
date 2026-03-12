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
        context = applyCrossSkuRules(context);

        return applySkuDiscount(context);
    }

    private RuleContext applyCrossSkuRules(RuleContext context) {
        for (var rule : getOrderedCrossSkuRules()) {
            RuleDelta delta = switch(rule) {
                case CrossSkuBuyXGetYFree free -> evaluator.apply(free, context);
                case CrossSkuBuyXGetYDiscount discount -> evaluator.apply(discount, context);
                default -> throw new IllegalStateException("Unexpected value: " + rule);
            };

            if(delta.applied()) {
                context = context.apply(delta);
                break;
            }
        }
        return context;
    }

    private RuleContext applySkuDiscount(RuleContext context) {
        for(var rule : getSkuDiscounts()) {
            RuleDelta delta = evaluator.apply(rule, context);
            if(delta.applied()){
                context = context.apply(delta);
            }
        }
        return context;
    }

    public List<CrossSkuRule> getOrderedCrossSkuRules() {
        return rules.getCrossSkuRules().stream()
                .sorted(Comparator.comparingInt(CrossSkuRule::priority))
                .toList();
    }

    public List<SkuDiscount> getSkuDiscounts() {return rules.getSkuDiscounts();}
}
