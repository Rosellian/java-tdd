package com.tdd.tracing;

import java.util.List;

public record RuleTrace(
        List<RuleTraceEvent> events,
        List<SkuTrace> skuTraces,
        List<DPTrace> dpTraces,
        double finalTotal
) {}