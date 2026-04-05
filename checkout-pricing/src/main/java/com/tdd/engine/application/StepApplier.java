package com.tdd.engine.application;

import com.tdd.PricingRules;
import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.application.rules.CrossRuleApplier;
import com.tdd.engine.application.rules.DiscountRuleApplier;
import com.tdd.engine.application.rules.utility.RuleApplication;
import com.tdd.rules.cross.CrossSkuRule;
import com.tdd.tracing.RuleTracer;
import com.tdd.tracing.debug.PricingTraceCollector;

import java.util.Comparator;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class StepApplier {
    private final PricingRules rules;
    private final RuleTracer tracer;
    private final PricingTraceCollector collector;

    public StepApplier(PricingRules rules, RuleTracer tracer, PricingTraceCollector collector) {
        this.rules = rules;
        this.tracer = tracer;
        this.collector = collector;
    }

    public RuleContext applyCrossSkuRules(RuleContext context, AtomicInteger stepIndex) {
        boolean alreadyApplied = false;
        CrossRuleApplier applier = new CrossRuleApplier(rules, tracer, stepIndex);

        for (var rule : getOrderedCrossSkuRules()) {
            RuleApplication result = applier.apply(context, rule, alreadyApplied);

            recordRule(result);

            if(result.applied()) {
                context = context.apply(result.delta());
                alreadyApplied = true;
            }
        }

        return context;
    }

    public RuleContext applySkuDiscount(RuleContext context, AtomicInteger stepIndex) {
        for(var rule : rules.getSkuDiscounts()) {
            RuleApplication result = new DiscountRuleApplier(rules, tracer, stepIndex).apply(context, rule);

            recordRule(result);

            if(result.applied()){
                context = context.apply(result.delta());
            }
        }

        return context;
    }

    private void recordRule(RuleApplication result) {
        if(collector != null) {
            collector.recordRule(result.rt());
        }
    }

    private List<CrossSkuRule> getOrderedCrossSkuRules() {
        return rules.getCrossSkuRules().stream()
                .sorted(Comparator.comparingInt(CrossSkuRule::priority))
                .toList();
    }
}
