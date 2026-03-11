package com.tdd;

import com.tdd.rules.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.CrossSkuBuyXGetYFree;

import java.util.Map;

public interface IRuleEvaluator {

    boolean apply(CrossSkuBuyXGetYFree rule, Map<String, Long> counts, Map<String, SkuMod> mods);

    boolean apply(CrossSkuBuyXGetYDiscount rule, Map<String, Long> counts, Map<String, SkuMod> mods);
}
