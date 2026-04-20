package com.tdd.tracing;

import java.util.List;

public record DPNode(
        int stepIndex,
        double price,
        List<String> explanation
) {}