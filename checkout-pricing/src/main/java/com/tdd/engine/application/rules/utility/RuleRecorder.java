package com.tdd.engine.application.rules.utility;

import com.tdd.PricingRules;
import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.RuleDelta;
import com.tdd.rules.Rule;
import com.tdd.tracing.RuleTraceEvent;
import com.tdd.tracing.debug.RuleTrace;

import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import static com.tdd.calculation.PriceUtils.computeTotalPrice;

public class RuleRecorder {
    private final PricingRules rules;

    public RuleRecorder(PricingRules rules) {
        this.rules = rules;
    }

    public Before recordBefore(RuleContext context, Rule rule, AtomicInteger stepIndex) {
        RuleTrace rt = createRuleTrace(rule, stepIndex);
        double beforePrice = computeTotalPrice(context, rules);
        rt.setBefore(beforePrice);

        return Before.from(context, rule, beforePrice, rt);
    }

    public RuleTraceEvent createEvent(RuleTrace rt, RuleInput ruleInput, After after) {
        RuleDelta delta = after.delta();
        boolean applied = delta.applied();
        String ruleName = ruleInput.rule().toString();
        int stepIndex = rt.getStepIndex();

        return new RuleTraceEvent(ruleName, applied, delta, ruleInput.context(), after.context(), stepIndex);
    }

    public RuleTrace updateRuleTrace(RuleTrace rt, After after) {
        RuleDelta delta = after.delta();
        boolean applied = delta.applied();
        rt.setMatched(applied);

        double afterPrice = computeTotalPrice(after.context(), rules);
        rt.setAfter(afterPrice);
        rt.setDelta(afterPrice - rt.getBefore());

        if(!applied) {
            rt.setReason("Rule conditions not met");
        }
        else {
            rt.setOutputs(Map.of("delta", delta,
                    "newCounts", after.context().counts()));
        }

        return rt;
    }

    private RuleTrace createRuleTrace(Rule rule, AtomicInteger stepIndex) {
        RuleTrace rt = new RuleTrace();
        rt.setId(rule.id());
        rt.setName(rule.name());
        rt.setStepIndex(stepIndex.getAndIncrement());

        return rt;
    }
}
