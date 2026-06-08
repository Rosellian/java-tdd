package com.tdd.tracing.debug;

public record StepTrace(
        String step,
        int stepIndex,
        String description,
        double priceBefore,
        double priceAfter
) {}