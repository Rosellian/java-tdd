package com.tdd.engine.utility;

import java.util.Map;

public record RuleDelta(
        Map<String, SkuMod> modChanges,
        boolean applied
) {

    public static RuleDelta none() {
        return new RuleDelta(Map.of(), false);
    }
}