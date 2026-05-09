package com.tdd.engine.application.rules.utility;

import com.tdd.PricingRules;
import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.RuleDelta;
import com.tdd.rules.Rule;
import com.tdd.tracing.debug.PricingTraceCollector;
import com.tdd.tracing.debug.RuleTrace;

import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import static com.tdd.calculation.PriceUtils.computeTotalPrice;

public class RuleRecorder {
    private final PricingRules rules;
    private final PricingTraceCollector collector;

    public RuleRecorder(PricingRules rules, PricingTraceCollector collector) {
        this.rules = rules;
        this.collector = collector;
    }

    public Before recordBefore(RuleContext context, Rule rule, AtomicInteger stepIndex) {
        RuleTrace rt = createRuleTrace(rule, stepIndex);
        double beforePrice = computeTotalPrice(context, rules);
        rt.setBefore(beforePrice);

        return new Before(rt, beforePrice);
    }

    public After recordAfter(RuleContext context, Rule rule, RuleDelta delta, AtomicInteger stepIndex) {
        boolean applied = delta.applied();
        RuleContext after = applied ? context.apply(delta) : context; //TODO logic belongs to applier
        collector.addEvent(rule.toString(), applied, delta, context, after, stepIndex.get());

        return new After(applied, after);
    }

    //TODO Keep RuleTrace separate, return it to underscore effect
    public void updateRuleTrace(Before before, After after, RuleDelta delta) {
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

    private RuleTrace createRuleTrace(Rule rule, AtomicInteger stepIndex) {
        RuleTrace rt = new RuleTrace();
        rt.setId(rule.id());
        rt.setName(rule.name());
        rt.setStepIndex(stepIndex.getAndIncrement());

        return rt;
    }
}
