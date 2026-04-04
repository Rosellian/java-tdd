package com.tdd.engine;

import com.tdd.PricingRules;
import com.tdd.tracing.RuleTracer;
import com.tdd.rules.CrossSkuRule;
import com.tdd.tracing.debug.PricingTraceCollector;

import java.util.Comparator;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import static com.tdd.calculation.PriceUtils.computeTotalPrice;

public class RuleEngine {
    private final PricingRules rules;
    private final RuleTracer tracer;
    private final PricingTraceCollector collector;

    public RuleEngine(PricingRules rules, RuleTracer tracer, PricingTraceCollector collector) {
        this.rules = rules;
        this.tracer = tracer;
        this.collector = collector;
    }

    public RuleContext evaluate(RuleContext context) {
        AtomicInteger stepIndex = new AtomicInteger(0);

        Evaluation crossResult = evaluateCrossRules(context, stepIndex);

        Evaluation discountResult = evaluateDiscount(crossResult, stepIndex);

        return discountResult.afterCross();
    }

    private Evaluation evaluateCrossRules(RuleContext context, AtomicInteger stepIndex) {
        int beforeCrossPrice = computeTotalPrice(context, rules);

        RuleContext afterCross = applyCrossSkuRules(context, stepIndex);

        int afterCrossPrice = computeTotalPrice(afterCross, rules);
        recordCrossSkuStep(stepIndex, beforeCrossPrice, afterCrossPrice);

        return new Evaluation(afterCross, afterCrossPrice);
    }

    private Evaluation evaluateDiscount(Evaluation result, AtomicInteger stepIndex) {
        RuleContext afterDiscount = applySkuDiscount(result.afterCross(), stepIndex);

        int afterDiscountPrice = computeTotalPrice(afterDiscount, rules);
        recordSkuDiscountStep(stepIndex, result.afterCrossPrice(), afterDiscountPrice);

        return new Evaluation(afterDiscount, afterDiscountPrice);
    }

    private void recordCrossSkuStep(AtomicInteger stepIndex, int beforeCrossPrice, int afterCrossPrice) {
        if(collector != null) {
            collector.recordStep("Cross-SKU rules", stepIndex.get()-1,
                    "Evaluates cross-SKU promotions such as Buy X Get Y", beforeCrossPrice, afterCrossPrice);
        }
    }

    private void recordSkuDiscountStep(AtomicInteger stepIndex, int afterCrossPrice, int afterDiscountPrice) {
        if(collector != null) {
            collector.recordStep("SKU-specific discounts", stepIndex.get()-1,
                    "Applies per-SKU discounts and price adjustments", afterCrossPrice, afterDiscountPrice);
        }
    }

    private RuleContext applyCrossSkuRules(RuleContext context, AtomicInteger stepIndex) {
        boolean alreadyApplied = false;
        RuleApplier applier = new RuleApplier(rules, tracer, stepIndex);

        for (var rule : getOrderedCrossSkuRules()) {
            RuleApplication result = applier.apply(context, rule, alreadyApplied);

            if(collector != null)
                collector.recordRule(result.rt());

            if(result.applied()) {
                context = context.apply(result.delta());
                alreadyApplied = true;
            }
        }

        return context;
    }

    private RuleContext applySkuDiscount(RuleContext context, AtomicInteger stepIndex) {
        for(var rule : rules.getSkuDiscounts()) {
            RuleApplication result = new RuleApplier(rules, tracer, stepIndex).apply(context, rule);

            if(collector != null)
                collector.recordRule(result.rt());

            if(result.applied()){
                context = context.apply(result.delta());
            }
        }

        return context;
    }

    private List<CrossSkuRule> getOrderedCrossSkuRules() {
        return rules.getCrossSkuRules().stream()
                .sorted(Comparator.comparingInt(CrossSkuRule::priority))
                .toList();
    }
}
