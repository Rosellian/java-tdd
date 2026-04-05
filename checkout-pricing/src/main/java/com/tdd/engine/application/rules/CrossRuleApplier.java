package com.tdd.engine.application.rules;

import com.tdd.PricingRules;
import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.RuleDelta;
import com.tdd.engine.application.rules.utility.RuleApplication;
import com.tdd.rules.cross.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.cross.CrossSkuBuyXGetYFree;
import com.tdd.rules.cross.CrossSkuRule;
import com.tdd.tracing.RuleTracer;
import com.tdd.tracing.debug.RuleTrace;

import java.util.concurrent.atomic.AtomicInteger;

public class CrossRuleApplier extends RuleApplier {

    public CrossRuleApplier(PricingRules rules, RuleTracer tracer, AtomicInteger stepIndex) {
        super(rules, tracer, stepIndex);
    }

    public RuleApplication apply(RuleContext context, CrossSkuRule rule, boolean skip) {
        return applyRule(context, rule, (rt) -> skip ? RuleDelta.none() : useEvaluator(context, rule, rt));
    }

    private RuleDelta useEvaluator(RuleContext context, CrossSkuRule rule, RuleTrace rt) {
        return switch (rule) {
            case CrossSkuBuyXGetYFree free -> evaluator.apply(free, context, rt);
            case CrossSkuBuyXGetYDiscount discount -> evaluator.apply(discount, context, rt);
            default -> throw new IllegalStateException("Unexpected value: " + rule);
        };
    }
}
