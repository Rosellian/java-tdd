package com.tdd.engine.application.rules.utility;

import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.RuleDelta;

public record After(RuleDelta delta, RuleContext context) {}