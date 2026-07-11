package com.tdd.tracing.debug;

import java.util.List;

public record DPTrace(
        String state,
        int stepIndex,
        List<String> options,
        String chosen,
        double price,
        String sku
) {}