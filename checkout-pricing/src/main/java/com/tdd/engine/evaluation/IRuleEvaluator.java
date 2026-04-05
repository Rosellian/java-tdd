package com.tdd.engine.evaluation;

import com.tdd.engine.RuleContext;
import com.tdd.engine.RuleDelta;
import com.tdd.rules.cross.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.cross.CrossSkuBuyXGetYFree;
import com.tdd.rules.SkuDiscount;
import com.tdd.tracing.debug.RuleTrace;

public interface IRuleEvaluator {

    RuleDelta apply(CrossSkuBuyXGetYFree rule, RuleContext context, RuleTrace rt);
    RuleDelta apply(CrossSkuBuyXGetYDiscount rule, RuleContext context, RuleTrace rt);
    RuleDelta apply(SkuDiscount rule, RuleContext context, RuleTrace rt);
}
