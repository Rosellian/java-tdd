package com.tdd.engine;

import com.tdd.PricingRules;
import com.tdd.engine.application.StepApplier;
import com.tdd.tracing.RuleTracer;
import com.tdd.tracing.debug.PricingTraceCollector;

import java.util.concurrent.atomic.AtomicInteger;

import static com.tdd.calculation.PriceUtils.computeTotalPrice;

public class RuleEngine {
    public static final String SKU_DISCOUNTS = "SKU-specific discounts";
    public static final String SKU_DISCOUNT_DESCRIPTION = "Applies per-SKU discounts and price adjustments";
    public static final String CROSS_SKU = "Cross-SKU rules";
    public static final String CROSS_SKU_DESCRIPTION = "Evaluates cross-SKU promotions such as Buy X Get Y";

    private final PricingRules rules;
    private final StepApplier stepApplier;
    private final PricingTraceCollector collector;

    public RuleEngine(PricingRules rules, RuleTracer tracer, PricingTraceCollector collector) {
        this.rules = rules;
        this.stepApplier = new StepApplier(rules, tracer, collector);
        this.collector = collector;
    }

    public RuleContext evaluate(RuleContext context) {
        AtomicInteger stepIndex = new AtomicInteger(0);

        Evaluation crossResult = evaluateCrossRules(context, stepIndex);

        Evaluation discountResult = evaluateDiscount(crossResult, stepIndex);

        return discountResult.context();
    }

    private Evaluation evaluateCrossRules(RuleContext context, AtomicInteger stepIndex) {
        int beforeCrossPrice = computeTotalPrice(context, rules);

        RuleContext afterCross = stepApplier.applyCrossSkuRules(context, stepIndex);

        int afterCrossPrice = computeTotalPrice(afterCross, rules);
        recordCrossSkuStep(stepIndex, beforeCrossPrice, afterCrossPrice);

        return new Evaluation(afterCross, afterCrossPrice);
    }

    private Evaluation evaluateDiscount(Evaluation result, AtomicInteger stepIndex) {
        RuleContext afterDiscount = stepApplier.applySkuDiscount(result.context(), stepIndex);

        int afterDiscountPrice = computeTotalPrice(afterDiscount, rules);
        recordSkuDiscountStep(stepIndex, result.price(), afterDiscountPrice);

        return new Evaluation(afterDiscount, afterDiscountPrice);
    }

    private void recordCrossSkuStep(AtomicInteger stepIndex, int beforeCrossPrice, int afterCrossPrice) {
        recordStep(CROSS_SKU, CROSS_SKU_DESCRIPTION, stepIndex, beforeCrossPrice, afterCrossPrice);
    }

    private void recordSkuDiscountStep(AtomicInteger stepIndex, int afterCrossPrice, int afterDiscountPrice) {
        recordStep(SKU_DISCOUNTS, SKU_DISCOUNT_DESCRIPTION, stepIndex, afterCrossPrice, afterDiscountPrice);
    }

    private void recordStep(String step, String description, AtomicInteger stepIndex, int beforePrice, int afterPrice) {
        if(collector != null) {
            collector.recordStep(step, stepIndex.get()-1, description, beforePrice, afterPrice);
        }
    }
}
