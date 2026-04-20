package com.tdd.engine.application.rules;

import com.tdd.PricingRules;
import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.RuleDelta;
import com.tdd.engine.application.rules.utility.After;
import com.tdd.engine.application.rules.utility.Before;
import com.tdd.engine.application.rules.utility.RuleApplication;
import com.tdd.engine.evaluation.RuleEvaluator;
import com.tdd.rules.*;
import com.tdd.tracing.debug.PricingTraceCollector;
import com.tdd.tracing.debug.RuleTrace;

import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;

import static com.tdd.calculation.PriceUtils.computeTotalPrice;

public class RuleApplier {
    private final PricingRules rules;
    protected final RuleEvaluator evaluator;
    private final PricingTraceCollector collector;
    private final AtomicInteger stepIndex;

    public RuleApplier(PricingRules rules, PricingTraceCollector collector, AtomicInteger stepIndex) {
        this.rules = rules;
        this.evaluator = new RuleEvaluator(rules);
        this.collector = collector;
        this.stepIndex = stepIndex;
    }

    protected RuleApplication applyRule(RuleContext context, Rule rule, Function<RuleTrace, RuleDelta> eval) {
        Before beforeResult = recordBefore(context, rule);
        RuleTrace rt = beforeResult.rt();

        RuleDelta delta = eval.apply(rt);

        After afterResult = recordAfter(context, rule, delta);
        boolean applied = afterResult.applied();
        updateRuleTrace(beforeResult, afterResult, delta);

        return new RuleApplication(rt, delta, applied);
    }

    private void updateRuleTrace(Before before, After after, RuleDelta delta) {
        RuleTrace rt = before.rt();

        rt.setMatched(after.applied());

        double afterPrice = computeTotalPrice(after.context(), rules);
        rt.setAfter(afterPrice);
        rt.setDelta(afterPrice - before.price());

        if(!after.applied()) {
            rt.setReason("Rule conditions not met");
        }
        else {
            rt.setOutputs(Map.of("delta", delta,
                    "newCounts", after.context().counts()));
        }
    }

    private Before recordBefore(RuleContext context, Rule rule) {
        RuleTrace rt = createRuleTrace(rule);
        double beforePrice = computeTotalPrice(context, rules);
        rt.setBefore(beforePrice);

        return new Before(rt, beforePrice);
    }

    private After recordAfter(RuleContext context, Rule rule, RuleDelta delta) {
        boolean applied = delta.applied();
        RuleContext after = applied ? context.apply(delta) : context;
        collector.addEvent(rule.toString(), applied, delta, context, after, stepIndex.get());

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
