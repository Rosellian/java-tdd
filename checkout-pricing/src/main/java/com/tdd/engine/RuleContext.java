package com.tdd.engine;

import com.tdd.tracing.debug.CartItem;
import com.tdd.tracing.debug.CartSnapshot;

import java.util.HashMap;
import java.util.Map;

import static java.util.stream.Collectors.toMap;

public record RuleContext(
        Map<String, Long> counts,
        Map<String, SkuMod> mods
) {

    public static RuleContext fromCart(CartSnapshot cartSnapshot) {
        Map<String, Long> counts = cartSnapshot.getItems().stream()
                .collect(toMap(CartItem::getSku, i -> (long)i.getQuantity()));

        return new RuleContext(counts, Map.of());
    }

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

    public long countOf(String sku) {
        return counts.getOrDefault(sku, 0L);
    }

    public SkuMod modOf(String sku) {
        return mods.getOrDefault(sku, new SkuMod(0, 0, 1.0));
    }
}