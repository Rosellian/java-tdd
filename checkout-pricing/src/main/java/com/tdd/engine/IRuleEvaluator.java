package com.tdd.engine;

import com.tdd.rules.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.CrossSkuBuyXGetYFree;
import com.tdd.rules.SkuDiscount;

public interface IRuleEvaluator {

    RuleDelta apply(CrossSkuBuyXGetYFree rule, RuleContext context);
    RuleDelta apply(CrossSkuBuyXGetYDiscount rule, RuleContext context);
    RuleDelta apply(SkuDiscount rule, RuleContext context);
}
