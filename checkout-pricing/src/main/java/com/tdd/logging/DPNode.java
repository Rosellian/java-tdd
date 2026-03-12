package com.tdd.logging;

import java.util.List;

public record DPNode(
        int index,
        int price,
        List<String> explanation
) {}