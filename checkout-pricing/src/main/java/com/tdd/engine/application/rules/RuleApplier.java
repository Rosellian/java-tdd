package com.tdd.engine.application.rules;

import com.tdd.PricingRules;
import com.tdd.engine.RuleContext;
import com.tdd.engine.RuleDelta;
import com.tdd.engine.evaluation.RuleEvaluator;
import com.tdd.rules.*;
import com.tdd.rules.cross.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.cross.CrossSkuBuyXGetYFree;
import com.tdd.rules.cross.CrossSkuRule;
import com.tdd.tracing.RuleTracer;
import com.tdd.tracing.debug.RuleTrace;

import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import static com.tdd.calculation.PriceUtils.computeTotalPrice;

public class RuleApplier {
    private final PricingRules rules;
    private final RuleEvaluator evaluator;
    private final RuleTracer tracer;
    private final AtomicInteger stepIndex;

    public RuleApplier(PricingRules rules, RuleTracer tracer, AtomicInteger stepIndex) {
        this.rules = rules;
        this.evaluator = new RuleEvaluator(rules);
        this.tracer = tracer;
        this.stepIndex = stepIndex;
    }

    public RuleApplication apply(RuleContext context, CrossSkuRule rule, boolean skip) {
        Before beforeResult = recordBefore(context, rule);
        RuleTrace rt = beforeResult.rt();

        RuleDelta delta = skip ? RuleDelta.none() : switch(rule) {
            case CrossSkuBuyXGetYFree free -> evaluator.apply(free, context, rt);
            case CrossSkuBuyXGetYDiscount discount -> evaluator.apply(discount, context, rt);
            default -> throw new IllegalStateException("Unexpected value: " + rule);
        };

        After afterResult = recordAfter(context, rule, delta);
        boolean applied = afterResult.applied();
        updateRuleTrace(rt, applied, afterResult.after(), beforeResult.beforePrice(), delta);

        return new RuleApplication(rt, delta, applied);
    }

    public RuleApplication apply(RuleContext context, SkuDiscount rule) {
        Before beforeResult = recordBefore(context, rule);
        RuleTrace rt = beforeResult.rt();

        RuleDelta delta = evaluator.apply(rule, context, rt);

        After afterResult = recordAfter(context, rule, delta);
        boolean applied = afterResult.applied();
        updateRuleTrace(rt, applied, afterResult.after(), beforeResult.beforePrice(), delta);

        return new RuleApplication(rt, delta, applied);
    }

    private void updateRuleTrace(RuleTrace rt, boolean applied, RuleContext after, int beforePrice, RuleDelta delta) {
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
    }

    private Before recordBefore(RuleContext context, Rule rule) {
        RuleTrace rt = createRuleTrace(rule);
        int beforePrice = computeTotalPrice(context, rules);
        rt.setBefore(beforePrice);

        return new Before(rt, beforePrice);
    }

    private After recordAfter(RuleContext context, Rule rule, RuleDelta delta) {
        boolean applied = delta.applied();
        RuleContext after = applied ? context.apply(delta) : context;
        tracer.log(rule.toString(), applied, delta, context, after, stepIndex.get());

        return new After(applied, after);
    }

    private RuleTrace createRuleTrace(Rule rule) {
        RuleTrace rt = new RuleTrace();
        rt.setId(rule.id());
        rt.setName(rule.name());
        rt.setStepIndex(stepIndex.getAndIncrement());

        return rt;
    }
}
