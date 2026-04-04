package com.tdd.engine;

import com.tdd.tracing.debug.RuleTrace;

public record RuleApplication(RuleTrace rt, RuleDelta delta, boolean applied) {}