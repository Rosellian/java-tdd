package com.tdd.engine.application.rules;

import com.tdd.engine.RuleContext;

public record After(boolean applied, RuleContext after) {}