package com.tdd.engine.application.rules.utility;

import com.tdd.engine.utility.RuleDelta;
import com.tdd.tracing.debug.RuleTrace;

public record RuleApplication(RuleTrace rt, RuleDelta delta, boolean applied) {}