package com.tdd.tracing;

import java.util.List;

public record DPNode(
        int stepIndex,
        int price,
        List<String> explanation
) {}