package com.tdd.engine.application.rules;

import com.tdd.PricingRules;
import com.tdd.engine.application.rules.utility.*;
import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.RuleDelta;
import com.tdd.engine.evaluation.RuleEvaluator;
import com.tdd.rules.*;
import com.tdd.rules.cross.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.cross.CrossSkuBuyXGetYFree;
import com.tdd.rules.cross.CrossSkuRule;
import com.tdd.tracing.RuleTraceEvent;
import com.tdd.tracing.debug.RuleTrace;

import java.util.concurrent.atomic.AtomicInteger;

public class RuleApplier implements IRuleApplier {
    private final RuleEvaluator evaluator;
    private final RuleRecorder recorder;

    public RuleApplier(PricingRules rules) {
        this.evaluator = new RuleEvaluator(rules);
        this.recorder = new RuleRecorder(rules);
    }

    public RuleApplication apply(RuleContext context, CrossSkuRule rule, boolean skip, AtomicInteger stepIndex) {
        Before before = recorder.recordBefore(context, rule, stepIndex);
        RuleTrace rt = before.rt();

        RuleDelta delta = skip ? RuleDelta.none() : useEvaluator(context, rule, rt);

        return recordResult(rt, before.input(), delta);
    }

    public RuleApplication apply(RuleContext context, SkuDiscount rule, AtomicInteger stepIndex) {
        Before before = recorder.recordBefore(context, rule, stepIndex);
        RuleTrace rt = before.rt();

        RuleDelta delta = evaluator.apply(rule, context, rt);

        return recordResult(rt, before.input(), delta);
    }

    private RuleDelta useEvaluator(RuleContext context, CrossSkuRule rule, RuleTrace rt) {
        return switch (rule) {
            case CrossSkuBuyXGetYFree free -> evaluator.apply(free, context, rt);
            case CrossSkuBuyXGetYDiscount discount -> evaluator.apply(discount, context, rt);
            default -> throw new IllegalStateException("Unexpected value: " + rule);
        };
    }

    private RuleApplication recordResult(RuleTrace rt, RuleInput input, RuleDelta delta) {
        After after = createAfter(input, delta);

        RuleTraceEvent event = recorder.createEvent(rt, input, after);
        RuleTrace rtNew = recorder.updateRuleTrace(rt, after);

        return RuleApplication.from(after, rtNew, event);
    }

    private After createAfter(RuleInput input, RuleDelta delta) {
        RuleContext context = input.context();
        RuleContext contextAfter = delta.applied() ? context.apply(delta) : context;

        return new After(delta, contextAfter);
    }
}
