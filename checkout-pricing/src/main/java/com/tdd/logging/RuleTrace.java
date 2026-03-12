package com.tdd.logging;

import java.util.List;

public record RuleTrace(
        List<RuleDebugEvent> events,
        List<SkuTrace> skuTraces,
        List<DPTrace> dpTraces,
        int finalTotal
) {}