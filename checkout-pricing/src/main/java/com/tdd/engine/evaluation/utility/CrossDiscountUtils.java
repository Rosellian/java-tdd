package com.tdd.engine.evaluation.utility;

import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.RuleDelta;
import com.tdd.engine.utility.SkuMod;
import com.tdd.rules.cross.CrossSkuBuyXGetYDiscount;

import static com.tdd.engine.evaluation.utility.EvaluatorUtils.*;

public class CrossDiscountUtils {

    public static long calculateTimesDiscounted(CrossSkuBuyXGetYDiscount rule, RuleContext context) {
        long packetsToBuy = getPacketsToBuy(rule, context);
        long discountedPacketsNeeded = context.countOf(rule.discountSku()) / rule.discountQty();

        return Math.min(packetsToBuy, discountedPacketsNeeded);
    }

    public static int calculateTotalDiscounted(CrossSkuBuyXGetYDiscount rule, long times) {
        times = adjustTimesForNonStack(rule, times);

        return (int) (rule.discountQty() * times);
    }

    public static RuleDelta createDelta(CrossSkuBuyXGetYDiscount rule, int totalDiscounted) {
        SkuMod mod = new SkuMod(0, totalDiscounted, getRate(rule));

        return getDelta(rule.discountSku(), mod);
    }
}
