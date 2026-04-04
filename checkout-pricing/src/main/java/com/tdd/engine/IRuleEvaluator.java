package com.tdd.engine;

import com.tdd.rules.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.CrossSkuBuyXGetYFree;
import com.tdd.rules.SkuDiscount;
import com.tdd.tracing.debug.RuleTrace;

public interface IRuleEvaluator {

    RuleDelta apply(CrossSkuBuyXGetYFree rule, RuleContext context, RuleTrace rt);
    RuleDelta apply(CrossSkuBuyXGetYDiscount rule, RuleContext context, RuleTrace rt);
    RuleDelta apply(SkuDiscount rule, RuleContext context, RuleTrace rt);
}
