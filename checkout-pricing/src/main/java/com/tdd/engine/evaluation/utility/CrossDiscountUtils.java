package com.tdd.engine.evaluation.utility;

import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.RuleDelta;
import com.tdd.engine.utility.SkuMod;
import com.tdd.rules.cross.CrossSkuBuyXGetYDiscount;

import static com.tdd.engine.evaluation.utility.EvaluatorUtils.*;

public class CrossDiscountUtils {

    private CrossDiscountUtils() {}

    public static int calculateTimesDiscounted(CrossSkuBuyXGetYDiscount rule, RuleContext context) {
        int packetsToBuy = getPacketsToBuy(rule, context);
        int discountCount = context.countOf(rule.discountSku());
        int discountedPacketsNeeded = discountCount / rule.discountQty();

        return Math.min(packetsToBuy, discountedPacketsNeeded);
    }

    public static int calculateTotalDiscounted(CrossSkuBuyXGetYDiscount rule, int times) {
        times = adjustTimesForNonStack(rule, times);

        return rule.discountQty() * times;
    }

    public static RuleDelta createDelta(CrossSkuBuyXGetYDiscount rule, int totalDiscounted) {
        double rate = getRate(rule);
        SkuMod mod = new SkuMod(0, totalDiscounted, rate);

        return getDelta(rule.discountSku(), mod);
    }
}
