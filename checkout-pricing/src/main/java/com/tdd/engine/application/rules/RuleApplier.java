package com.tdd.engine.application.rules;

import com.tdd.PricingRules;
import com.tdd.engine.application.rules.utility.RuleRecorder;
import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.RuleDelta;
import com.tdd.engine.application.rules.utility.After;
import com.tdd.engine.application.rules.utility.Before;
import com.tdd.engine.application.rules.utility.RuleApplication;
import com.tdd.engine.evaluation.RuleEvaluator;
import com.tdd.rules.*;
import com.tdd.rules.cross.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.cross.CrossSkuBuyXGetYFree;
import com.tdd.rules.cross.CrossSkuRule;
import com.tdd.tracing.debug.PricingTraceCollector;
import com.tdd.tracing.debug.RuleTrace;

import java.util.concurrent.atomic.AtomicInteger;

public class RuleApplier implements IRuleApplier {
    private final RuleEvaluator evaluator;
    private final RuleRecorder recorder;

    public RuleApplier(PricingRules rules, PricingTraceCollector collector) {
        this.evaluator = new RuleEvaluator(rules);
        this.recorder = new RuleRecorder(rules, collector);
    }

    public RuleApplication apply(RuleContext context, CrossSkuRule rule, boolean skip, AtomicInteger stepIndex) {
        Before before = recorder.recordBefore(context, rule, stepIndex);
        RuleTrace rt = before.rt();

        RuleDelta delta = skip ? RuleDelta.none() : useEvaluator(context, rule, rt);

        return recordResult(context, rule, stepIndex, before, delta);
    }

    public RuleApplication apply(RuleContext context, SkuDiscount rule, AtomicInteger stepIndex) {
        Before before = recorder.recordBefore(context, rule, stepIndex);
        RuleTrace rt = before.rt();

        RuleDelta delta = evaluator.apply(rule, context, rt);

        return recordResult(context, rule, stepIndex, before, delta);
    }

    private RuleDelta useEvaluator(RuleContext context, CrossSkuRule rule, RuleTrace rt) {
        return switch (rule) {
            case CrossSkuBuyXGetYFree free -> evaluator.apply(free, context, rt);
            case CrossSkuBuyXGetYDiscount discount -> evaluator.apply(discount, context, rt);
            default -> throw new IllegalStateException("Unexpected value: " + rule);
        };
    }

    //TODO Create better method signatures with new data carrier(s)
    private RuleApplication recordResult(RuleContext context, Rule rule, AtomicInteger stepIndex, Before before, RuleDelta delta) {
        After after = recorder.recordAfter(context, rule, delta, stepIndex);
        boolean applied = after.applied();
        recorder.updateRuleTrace(before, after, delta);

        return new RuleApplication(before.rt(), delta, applied);
    }
}
