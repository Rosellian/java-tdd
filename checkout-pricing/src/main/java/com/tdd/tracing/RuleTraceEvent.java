package com.tdd.tracing;

import com.tdd.engine.RuleContext;
import com.tdd.engine.RuleDelta;

public record RuleTraceEvent(
        String ruleName,
        boolean applied,
        RuleDelta delta,
        RuleContext before,
        RuleContext after,
        int stepIndex
) {}