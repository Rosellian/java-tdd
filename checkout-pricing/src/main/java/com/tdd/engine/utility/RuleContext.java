package com.tdd.engine.utility;

import com.tdd.tracing.debug.CartItem;
import com.tdd.tracing.debug.CartSnapshot;

import java.util.HashMap;
import java.util.Map;

import static com.tdd.engine.utility.SkuMod.skuModRemapper;
import static java.util.stream.Collectors.toMap;

public record RuleContext(
        Map<String, Integer> counts,
        Map<String, SkuMod> mods
) {

    public static RuleContext fromCart(CartSnapshot cartSnapshot) {
        Map<String, Integer> counts = cartSnapshot.items().stream()
                .collect(toMap(CartItem::sku, CartItem::quantity));

        return new RuleContext(counts, Map.of());
    }

    public RuleContext apply(RuleDelta delta) {
        Map<String, Integer> newCounts = new HashMap<>(counts);
        Map<String, SkuMod> newMods = new HashMap<>(mods);

        delta.modChanges().forEach((sku, mod) -> newMods.merge(sku, mod, skuModRemapper));

        return new RuleContext(newCounts, newMods);
    }

    public int countOf(String sku) {
        return counts.getOrDefault(sku, 0);
    }

    public SkuMod modOf(String sku) {
        return mods.getOrDefault(sku, new SkuMod(0, 0, 1.0));
    }
}