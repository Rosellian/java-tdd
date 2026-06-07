package com.tdd.engine.evaluation.utility;

import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.RuleDelta;
import com.tdd.engine.utility.SkuMod;
import com.tdd.rules.Rule;
import com.tdd.rules.SkuDiscount;
import com.tdd.rules.cross.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.cross.CrossSkuRule;

import java.util.Map;

public class EvaluatorUtils {

    private EvaluatorUtils() {}

    static int getPacketsToBuy(CrossSkuRule rule, RuleContext context) {
        return context.countOf(rule.buySku()) / rule.buyQty();
    }

    static int adjustTimesForNonStack(CrossSkuRule rule, int times) {
        return !rule.stackable() ? 1 : times;
    }

    static double getRate(Rule rule) {
        double discount = switch (rule) {
            case SkuDiscount r -> r.discount();
            case CrossSkuBuyXGetYDiscount r -> r.discount();
            default -> throw new IllegalStateException("Unexpected value: " + rule);
        };

        return 1 - discount;
    }

    static RuleDelta getDelta(String sku, SkuMod mod) {
        return new RuleDelta(Map.of(sku, mod), true);
    }
}
