package com.tdd.engine.evaluation.utility;

import com.tdd.engine.utility.RuleContext;
import com.tdd.rules.SkuDiscount;
import com.tdd.rules.cross.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.cross.CrossSkuBuyXGetYFree;
import com.tdd.tracing.debug.RuleTrace;

import java.util.Map;

public class Tracing {
    public static final String CONTEXT_COUNTS = "contextCounts";
    public static final String BUY_SKU = "buySku";

    public static void updateRuleTrace(CrossSkuBuyXGetYDiscount rule, RuleContext context, RuleTrace rt) {
        rt.setInputs(Map.of(BUY_SKU, rule.buySku(),
                "discountSku", rule.discountSku(),
                CONTEXT_COUNTS, context.counts()));
    }

    public static void updateRuleTrace(CrossSkuBuyXGetYFree rule, RuleContext context, RuleTrace rt) {
        rt.setInputs(Map.of(BUY_SKU, rule.buySku(),
                "freeSku", rule.freeSku(),
                CONTEXT_COUNTS, context.counts()));
    }

    public static void updateRuleTrace(SkuDiscount rule, RuleContext context, RuleTrace rt) {
        rt.setInputs(Map.of("sku", rule.sku(),
                "discount", rule.discount(),
                CONTEXT_COUNTS, context.counts()));
    }
}
