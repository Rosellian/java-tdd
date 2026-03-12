package com.tdd.logging;

import com.tdd.engine.RuleContext;
import com.tdd.engine.RuleDelta;

public record RuleDebugEvent(
        String ruleName,
        boolean applied,
        RuleDelta delta,
        RuleContext before,
        RuleContext after
) {}