package com.tdd.engine;

import com.tdd.PricingRules;
import com.tdd.calculation.StepPriceComputer;
import com.tdd.engine.application.StepApplier;
import com.tdd.engine.utility.Evaluation;
import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.utility.StepRecorder;
import com.tdd.tracing.debug.PricingTraceCollector;

import java.util.concurrent.atomic.AtomicInteger;

public class RuleEngine {
    private final StepPriceComputer priceComputer;
    private final StepApplier stepApplier;
    private final StepRecorder recorder;

    public RuleEngine(PricingRules rules, PricingTraceCollector collector) {
        this.priceComputer = new StepPriceComputer(rules);
        this.stepApplier = new StepApplier(rules, collector);
        this.recorder = new StepRecorder(collector);
    }

    public RuleContext evaluate(RuleContext context) {
        AtomicInteger stepIndex = new AtomicInteger(0);

        Evaluation crossResult = evaluateCrossRules(context, stepIndex);

        Evaluation discountResult = evaluateDiscount(crossResult, stepIndex);

        return discountResult.context();
    }

    private Evaluation evaluateCrossRules(RuleContext context, AtomicInteger stepIndex) {
        recorder.logCrossStepStart();
        double beforeCrossPrice = priceComputer.computeTotalPrice(context);

        RuleContext afterCross = stepApplier.applyCrossSkuRules(context, stepIndex);

        double afterCrossPrice = priceComputer.computeTotalPrice(afterCross);
        recorder.recordCrossSkuStep(stepIndex, beforeCrossPrice, afterCrossPrice);

        return new Evaluation(afterCross, afterCrossPrice);
    }

    private Evaluation evaluateDiscount(Evaluation result, AtomicInteger stepIndex) {
        recorder.logDiscountStepStart();

        RuleContext afterDiscount = stepApplier.applySkuDiscounts(result.context(), stepIndex);

        double afterDiscountPrice = priceComputer.computeTotalPrice(afterDiscount);
        recorder.recordSkuDiscountStep(stepIndex, result.price(), afterDiscountPrice);

        return new Evaluation(afterDiscount, afterDiscountPrice);
    }
}
