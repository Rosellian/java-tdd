package com.tdd;

import com.tdd.rules.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.CrossSkuBuyXGetYFree;

import java.util.Map;

public class RuleEvaluator implements IRuleEvaluator {


    @Override
    public boolean apply(CrossSkuBuyXGetYFree rule, Map<String, Long> counts, Map<String, SkuMod> mods) {
        String buySku = rule.buySku();
        String freeSku = rule.freeSku();
        int buyQty = rule.buyQty();
        int freeQty = rule.freeQty();

        long originalBuyCount = counts.get(buySku);
        long originalFreeCount = counts.get(freeSku);

        boolean applied = false;
        while(counts.get(buySku) >= buyQty && counts.get(freeSku) >= freeQty) {
            applied = true;
            counts.put(buySku, counts.get(buySku) - buyQty);

            counts.put(freeSku, counts.get(freeSku) - freeQty);
            mods.merge(freeSku, new SkuMod(freeQty, 0, 1.0), (oldMod, newMod)
                    -> new SkuMod(oldMod.free() + newMod.free(), oldMod.discounted(), 1.0));

            if(!rule.stackable()) break;
        }

        counts.put(buySku, originalBuyCount);
        counts.put(freeSku, originalFreeCount);
        return applied;
    }

    @Override
    public boolean apply(CrossSkuBuyXGetYDiscount rule, Map<String, Long> counts, Map<String, SkuMod> mods) {
        return false;
    }
}
