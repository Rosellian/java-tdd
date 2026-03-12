package com.tdd;

import java.util.HashMap;
import java.util.Map;

public record RuleContext(
        Map<String, Long> counts,
        Map<String, SkuMod> mods
) {

    public RuleContext apply(RuleDelta delta) {
        Map<String, Long> newCounts = new HashMap<>(counts);
        Map<String, SkuMod> newMods = new HashMap<>(mods);

        delta.modChanges().forEach((sku, mod) ->
                newMods.merge(sku, mod,
                        (oldMod, newMod) -> new SkuMod(
                                oldMod.free() + newMod.free(),
                                oldMod.discounted() + newMod.discounted(),
                                Math.min(oldMod.rate(), newMod.rate())
                        ))
        );
        return new RuleContext(newCounts, newMods);
    }

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