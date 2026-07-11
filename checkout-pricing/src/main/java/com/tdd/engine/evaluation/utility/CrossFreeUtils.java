package com.tdd.engine.evaluation.utility;

import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.RuleDelta;
import com.tdd.engine.utility.SkuMod;
import com.tdd.rules.cross.CrossSkuBuyXGetYFree;

import static com.tdd.engine.evaluation.utility.EvaluatorUtils.*;

public class CrossFreeUtils {

    private CrossFreeUtils() {}

    public static int calculateTimesFree(CrossSkuBuyXGetYFree rule, RuleContext context) {
        int packetsToBuy = getPacketsToBuy(rule, context);
        int freeCount = context.countOf(rule.freeSku());
        int freePacketsNeeded = freeCount / rule.freeQty();

        return Math.min(packetsToBuy, freePacketsNeeded);
    }

    public static int calculateTotalFree(CrossSkuBuyXGetYFree rule, int times) {
        times = adjustTimesForNonStack(rule, times);

        return times * rule.freeQty();
    }

    public static RuleDelta createDelta(CrossSkuBuyXGetYFree rule, int totalFree) {
        SkuMod mod = new SkuMod(totalFree, 0, 1.0);

        return getDelta(rule.freeSku(), mod);
    }
}
