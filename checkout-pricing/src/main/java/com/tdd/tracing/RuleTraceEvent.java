package com.tdd.tracing;

import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.RuleDelta;

public record RuleTraceEvent(
        String ruleName,
        String name,
        boolean applied,
        RuleDelta delta,
        RuleContext before,
        RuleContext after,
        int stepIndex
) {}