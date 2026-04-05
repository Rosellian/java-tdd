package com.tdd.engine.application.rules;

import com.tdd.engine.RuleDelta;
import com.tdd.tracing.debug.RuleTrace;

public record RuleApplication(RuleTrace rt, RuleDelta delta, boolean applied) {}