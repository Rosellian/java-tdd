package com.tdd.engine.application.rules.utility;

import com.tdd.engine.utility.RuleContext;
import com.tdd.rules.Rule;

public record RuleInput(
        RuleContext context,
        Rule rule,
        double price
) {}
