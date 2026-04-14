package com.tdd.engine.application.rules;

import com.tdd.PricingRules;
import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.RuleDelta;
import com.tdd.engine.application.rules.utility.RuleApplication;
import com.tdd.rules.SkuDiscount;
import com.tdd.tracing.debug.PricingTraceCollector;
import com.tdd.tracing.debug.RuleTrace;

import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;

public class DiscountRuleApplier extends RuleApplier {

    public DiscountRuleApplier(PricingRules rules, PricingTraceCollector collector, AtomicInteger stepIndex) {
        super(rules, collector, stepIndex);
    }

    public RuleApplication apply(RuleContext context, SkuDiscount rule) {
        Function<RuleTrace, RuleDelta> useEvaluator = (rt) -> useEvaluator(context, rule, rt);

        return applyRule(context, rule, useEvaluator);
    }

    private RuleDelta useEvaluator(RuleContext context, SkuDiscount rule, RuleTrace rt) {
        return evaluator.apply(rule, context, rt);
    }
}
