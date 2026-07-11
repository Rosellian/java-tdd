package com.tdd.tracing;

import java.util.List;

public record DPTrace(
        String sku,
        double unitPrice,
        int remaining,
        List<DPNode> nodes,
        List<RuleData> rules,
        double finalPrice,
        List<String> winningPath
) {}