package com.tdd.engine.utility;

public record Evaluation(
        RuleContext context,
        double price
) {}