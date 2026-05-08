package com.tdd.engine.evaluation;

import com.tdd.PricingRules;
import com.tdd.engine.evaluation.utility.CrossDiscountUtils;
import com.tdd.engine.evaluation.utility.CrossFreeUtils;
import com.tdd.engine.evaluation.utility.SkuDiscountUtils;
import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.RuleDelta;
import com.tdd.rules.Rule;
import com.tdd.rules.cross.CrossSkuBuyXGetYDiscount;
import com.tdd.rules.cross.CrossSkuBuyXGetYFree;
import com.tdd.rules.SkuDiscount;
import com.tdd.tracing.debug.RuleTrace;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.tdd.engine.evaluation.utility.CrossDiscountUtils.calculateTimesDiscounted;
import static com.tdd.engine.evaluation.utility.CrossDiscountUtils.calculateTotalDiscounted;
import static com.tdd.engine.evaluation.utility.CrossFreeUtils.*;
import static com.tdd.engine.evaluation.utility.SkuDiscountUtils.isFreeOrDiscounted;
import static com.tdd.engine.evaluation.utility.SkuDiscountUtils.skuDiscountHasHigherPriorityFor;
import static com.tdd.engine.evaluation.utility.Tracing.updateRuleTrace;

public class RuleEvaluator implements IRuleEvaluator {
    private static final Logger logger = LoggerFactory.getLogger(RuleEvaluator.class);
    private final PricingRules rules;

    public RuleEvaluator(PricingRules rules) {
        this.rules = rules;
    }

    @Override
    public RuleDelta apply(CrossSkuBuyXGetYFree rule, RuleContext context, RuleTrace rt) {
        log(rule);

        updateRuleTrace(rule, context, rt);

        int times = calculateTimesFree(rule, context);

        if(times == 0) return RuleDelta.none();

        int totalFree = calculateTotalFree(rule, times);

        return CrossFreeUtils.createDelta(rule, totalFree);
    }

    private void log(Rule rule) {
        logger.info("Evaluating {}", rule);
    }

    @Override
    public RuleDelta apply(CrossSkuBuyXGetYDiscount rule, RuleContext context, RuleTrace rt) {
        log(rule);

        updateRuleTrace(rule, context, rt);

        int times = calculateTimesDiscounted(rule, context);

        if(skuDiscountHasHigherPriorityOrZeroTimes(rule, times)) return RuleDelta.none();

        int totalDiscounted = calculateTotalDiscounted(rule, times);

        return CrossDiscountUtils.createDelta(rule, totalDiscounted);
    }

    @Override
    public RuleDelta apply(SkuDiscount rule, RuleContext context, RuleTrace rt) {
        log(rule);

        updateRuleTrace(rule, context, rt);

        if(isFreeOrDiscounted(context, rule.sku())) return RuleDelta.none();

        return SkuDiscountUtils.createDelta(rule);
    }

    private boolean skuDiscountHasHigherPriorityOrZeroTimes(CrossSkuBuyXGetYDiscount rule, int times) {
        return skuDiscountHasHigherPriorityFor(rules, rule.discountSku(), rule.priority()) || times == 0;
    }
}
