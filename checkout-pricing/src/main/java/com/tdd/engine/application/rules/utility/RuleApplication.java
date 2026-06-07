package com.tdd.engine.application.rules.utility;

import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.RuleDelta;
import com.tdd.tracing.RuleTraceEvent;
import com.tdd.tracing.debug.RuleTrace;

public record RuleApplication(
        boolean applied,
        RuleDelta delta,
        RuleContext context,
        RuleTrace rt,
        RuleTraceEvent event
) {

    public static RuleApplication from(After after, RuleTrace rt, RuleTraceEvent event) {
        RuleDelta delta = after.delta();

        return new RuleApplication(delta.applied(), delta, after.context(), rt, event);
    }
}