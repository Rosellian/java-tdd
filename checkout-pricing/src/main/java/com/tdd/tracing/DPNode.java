package com.tdd.tracing;

import java.util.List;

public record DPNode(
        int index,
        int price,
        List<String> explanation
) {}