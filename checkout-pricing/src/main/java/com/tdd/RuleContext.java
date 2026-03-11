package com.tdd;

import java.util.HashMap;
import java.util.Map;

public record RuleContext(
        Map<String, Long> counts,
        Map<String, SkuMod> mods
) {

    public RuleContext copy() {
        return new RuleContext(
                new HashMap<>(counts),
                new HashMap<>(mods)
        );
    }

    public long countOf(String sku) {
        return counts.getOrDefault(sku, 0L);
    }

    public SkuMod modOf(String sku) {
        return mods.getOrDefault(sku, new SkuMod(0, 0, 1.0));
    }
}