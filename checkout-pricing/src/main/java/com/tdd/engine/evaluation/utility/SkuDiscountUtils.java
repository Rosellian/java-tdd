package com.tdd.engine.evaluation.utility;

import com.tdd.PricingRules;
import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.RuleDelta;
import com.tdd.engine.utility.SkuMod;
import com.tdd.rules.SkuDiscount;

import static com.tdd.engine.evaluation.utility.EvaluatorUtils.getDelta;
import static com.tdd.engine.evaluation.utility.EvaluatorUtils.getRate;

public class SkuDiscountUtils {

    public static boolean isFreeOrDiscounted(RuleContext context, String sku) {
        SkuMod mod = context.modOf(sku);

        return mod.free() > 0 || mod.discounted() > 0;
    }

    public static boolean skuDiscountHasHigherPriorityFor(PricingRules rules, String sku, int crossSkuRulePriority) {
        return rules.getSkuDiscounts().stream()
                .anyMatch(r -> r.sku().equals(sku) && r.priority() < crossSkuRulePriority);
    }

    public static RuleDelta createDelta(SkuDiscount rule) {
        SkuMod mod = new SkuMod(0, 1, getRate(rule));

        return getDelta(rule.sku(), mod);
    }
}
