package com.tdd;

import com.tdd.rules.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.CrossSkuBuyXGetYFree;

import java.util.Map;

public interface IRuleEvaluator {

    RuleResult apply(CrossSkuBuyXGetYFree rule, RuleContext context);
    RuleResult apply(CrossSkuBuyXGetYDiscount rule, RuleContext context);
}
