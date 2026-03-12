package com.tdd;

import com.tdd.rules.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.CrossSkuBuyXGetYFree;
import com.tdd.rules.SkuDiscount;

import java.util.Map;

public interface IRuleEvaluator {

    RuleDelta apply(CrossSkuBuyXGetYFree rule, RuleContext context);
    RuleDelta apply(CrossSkuBuyXGetYDiscount rule, RuleContext context);
    RuleDelta apply(SkuDiscount rule, RuleContext context);
}
