package com.tdd.engine.application.rules;

import com.tdd.tracing.debug.RuleTrace;

public record Before(RuleTrace rt, int beforePrice) {}