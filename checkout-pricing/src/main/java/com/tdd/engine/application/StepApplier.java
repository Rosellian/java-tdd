package com.tdd.engine.application;

import com.tdd.PricingRules;
import com.tdd.engine.application.rules.RuleApplier;
import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.application.rules.utility.RuleApplication;
import com.tdd.rules.cross.CrossSkuRule;
import com.tdd.tracing.debug.PricingTraceCollector;

import java.util.Comparator;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class StepApplier {
    private final PricingRules rules;
    private final PricingTraceCollector collector;
    private final RuleApplier ruleApplier;

    public StepApplier(PricingRules rules, PricingTraceCollector collector) {
        this.rules = rules;
        this.collector = collector;
        ruleApplier = new RuleApplier(rules);
    }

    public RuleContext applyCrossSkuRules(RuleContext context, AtomicInteger stepIndex) {
        boolean alreadyApplied = false;
        RuleContext resultContext = context;

        for (var rule : getOrderedCrossSkuRules()) {
            RuleApplication result = ruleApplier.apply(resultContext, rule, alreadyApplied, stepIndex);

            recordRule(result);

            if(result.applied()) {
                resultContext = result.context();
                alreadyApplied = true;
            }
        }

        return resultContext;
    }

    public RuleContext applySkuDiscounts(RuleContext context, AtomicInteger stepIndex) {
        RuleContext resultContext = context;

        for(var rule : rules.getSkuDiscounts()) {
            RuleApplication result = ruleApplier.apply(resultContext, rule, stepIndex);

            recordRule(result);

            if(result.applied()) {
                resultContext = result.context();
            }
        }

        return resultContext;
    }

    private void recordRule(RuleApplication result) {
        if(collector != null) {
            collector.addEvent(result.event());
            collector.recordRule(result.rt());
        }
    }

    private List<CrossSkuRule> getOrderedCrossSkuRules() {
        return rules.getCrossSkuRules().stream()
                .sorted(Comparator.comparingInt(CrossSkuRule::priority))
                .toList();
    }
}
