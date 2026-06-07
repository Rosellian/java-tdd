package com.tdd.engine.application.rules.utility;

import com.tdd.engine.utility.RuleContext;
import com.tdd.rules.Rule;
import com.tdd.tracing.debug.RuleTrace;

public record Before(
        RuleInput input,
        RuleTrace rt
) {

    public static Before from(RuleContext context, Rule rule, double price, RuleTrace rt) {
        RuleInput input = new RuleInput(context, rule, price);

        return new Before(input, rt);
    }
}

