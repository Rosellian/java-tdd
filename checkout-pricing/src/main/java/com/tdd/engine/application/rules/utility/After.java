package com.tdd.engine.application.rules.utility;

import com.tdd.engine.utility.RuleContext;

public record After(boolean applied, RuleContext context) {}