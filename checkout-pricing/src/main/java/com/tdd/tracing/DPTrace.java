package com.tdd.tracing;

import java.util.List;

public record DPTrace(
        String sku,
        long remaining,
        List<DPNode> nodes,
        int finalPrice,
        List<String> winningPath
) {}