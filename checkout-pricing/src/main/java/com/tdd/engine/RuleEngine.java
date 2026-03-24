package com.tdd.engine;

import com.tdd.PricingRules;
import com.tdd.tracing.RuleTracer;
import com.tdd.rules.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.CrossSkuBuyXGetYFree;
import com.tdd.rules.CrossSkuRule;
import com.tdd.rules.SkuDiscount;
import com.tdd.tracing.debug.PricingTraceCollector;
import com.tdd.tracing.debug.RuleTrace;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import static com.tdd.PriceUtils.computeTotalPrice;

public class RuleEngine {
    private final PricingRules rules;
    private final RuleEvaluator evaluator;
    private final RuleTracer tracer;

    public RuleEngine(PricingRules rules, RuleTracer tracer) {
        this.rules = rules;
        this.evaluator = new RuleEvaluator(rules);
        this.tracer = tracer;
    }

    public RuleContext evaluate(RuleContext context) {
        return evaluate(context, null);
    }
    public RuleContext evaluate(RuleContext context, PricingTraceCollector collector) {
        AtomicInteger stepIndex = new AtomicInteger(0);
        int beforeCrossPrice = computeTotalPrice(context, rules);

        RuleContext afterCross = applyCrossSkuRules(context, collector, stepIndex);

        int afterCrossPrice = computeTotalPrice(afterCross, rules);
        if(collector != null) {
            collector.recordStep("Cross-SKU rules", stepIndex.get()-1,
                    "Evaluates cross-SKU promotions such as Buy X Get Y", beforeCrossPrice, afterCrossPrice);
            }

        RuleContext afterDiscount = applySkuDiscount(afterCross, collector, stepIndex);

        int afterDiscountPrice = computeTotalPrice(afterDiscount, rules);
        if(collector != null) {
            collector.recordStep("SKU-specific discounts", stepIndex.get()-1,
                    "Applies per-SKU discounts and price adjustments", afterCrossPrice, afterDiscountPrice);
        }

        return afterDiscount;
    }

    private RuleContext applyCrossSkuRules(RuleContext context,
                                           PricingTraceCollector collector, AtomicInteger stepIndex) {
        boolean alreadyApplied = false;
        for (var rule : getOrderedCrossSkuRules()) {
            RuleContext before = context;

            RuleTrace rt = new RuleTrace();
            rt.setId(rule.id());
            rt.setName(rule.name());
            rt.setStepIndex(stepIndex.getAndIncrement());
            int beforePrice = computeTotalPrice(before, rules);
            rt.setBefore(beforePrice);

            RuleDelta delta = alreadyApplied ? RuleDelta.none() : switch(rule) {
                case CrossSkuBuyXGetYFree free -> evaluator.apply(free, context, collector, rt);
                case CrossSkuBuyXGetYDiscount discount -> evaluator.apply(discount, context, collector, rt);
                default -> throw new IllegalStateException("Unexpected value: " + rule);
            };

            boolean applied = delta.applied();
            RuleContext after = applied ? context.apply(delta) : context;
            tracer.log(rule.toString(), applied, delta, before, after, stepIndex.get());

            rt.setMatched(applied);
            int afterPrice = computeTotalPrice(after, rules);
            rt.setAfter(afterPrice);
            rt.setDelta(afterPrice - beforePrice);
            if(!applied) {
                rt.setReason("Rule conditions not met");
            }
            else {
                rt.setOutputs(Map.of("delta", delta,
                        "newCounts", after.counts()));
            }
            if(collector != null)
                collector.recordRule(rt);

            if(applied) {
                context = context.apply(delta);
                //break;
                alreadyApplied = true;
            }
        }
        return context;
    }

    private RuleContext applySkuDiscount(RuleContext context,
                                         PricingTraceCollector collector, AtomicInteger stepIndex) {
        for(var rule : getSkuDiscounts()) {
            RuleContext before = context;

            RuleTrace rt = new RuleTrace();
            rt.setId(rule.id());
            rt.setName(rule.name());
            rt.setStepIndex(stepIndex.getAndIncrement());
            int beforePrice = computeTotalPrice(before, rules);
            rt.setBefore(beforePrice);

            RuleDelta delta = evaluator.apply(rule, context, collector, rt);

            boolean applied = delta.applied();
            RuleContext after = applied ? context.apply(delta) : context;
            tracer.log(rule.toString(), applied, delta, before, after, stepIndex.get());

            rt.setMatched(applied);
            int afterPrice = computeTotalPrice(after, rules);
            rt.setAfter(afterPrice);
            rt.setDelta(afterPrice - beforePrice);
            if(!applied) {
                rt.setReason("Rule conditions not met");
            }
            else {
                rt.setOutputs(Map.of("delta", delta,
                        "newCounts", after.counts()));
            }
            if(collector != null)
                collector.recordRule(rt);

            if(applied){
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
