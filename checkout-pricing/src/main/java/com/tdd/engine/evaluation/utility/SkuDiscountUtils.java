package com.tdd.engine.evaluation.utility;

import com.tdd.PricingRules;
import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.RuleDelta;
import com.tdd.engine.utility.SkuMod;
import com.tdd.rules.SkuDiscount;

import java.util.function.Predicate;

import static com.tdd.engine.evaluation.utility.EvaluatorUtils.getDelta;
import static com.tdd.engine.evaluation.utility.EvaluatorUtils.getRate;

public class SkuDiscountUtils {

    private SkuDiscountUtils() {}

    public static boolean isFreeOrDiscounted(RuleContext context, String sku) {
        SkuMod mod = context.modOf(sku);

        return mod.free() > 0 || mod.discounted() > 0;
    }

    public static boolean skuDiscountHasHigherPriorityFor(PricingRules rules, String sku, int crossSkuRulePriority) {
        return rules.getSkuDiscounts().stream()
                .anyMatch(sameSkuAndHigherPriority(sku, crossSkuRulePriority));
    }

    private static Predicate<SkuDiscount> sameSkuAndHigherPriority(String sku, int crossSkuRulePriority) {
        return r -> r.sku().equals(sku) && r.priority() < crossSkuRulePriority;
    }

    public static RuleDelta createDelta(SkuDiscount rule) {
        double rate = getRate(rule);
        SkuMod mod = new SkuMod(0, 1, rate);

        return getDelta(rule.sku(), mod);
    }
}
