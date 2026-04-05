package com.tdd.engine.utility;

import com.tdd.tracing.debug.PricingTraceCollector;

import java.util.concurrent.atomic.AtomicInteger;

public class StepRecorder {
    public static final String SKU_DISCOUNTS = "SKU-specific discounts";
    public static final String SKU_DISCOUNT_DESCRIPTION = "Applies per-SKU discounts and price adjustments";
    public static final String CROSS_SKU = "Cross-SKU rules";
    public static final String CROSS_SKU_DESCRIPTION = "Evaluates cross-SKU promotions such as Buy X Get Y";

    private final PricingTraceCollector collector;

    public StepRecorder(PricingTraceCollector collector) {
        this.collector = collector;
    }

    public void recordCrossSkuStep(AtomicInteger stepIndex, int beforeCrossPrice, int afterCrossPrice) {
        recordStep(CROSS_SKU, CROSS_SKU_DESCRIPTION, stepIndex, beforeCrossPrice, afterCrossPrice);
    }

    public void recordSkuDiscountStep(AtomicInteger stepIndex, int afterCrossPrice, int afterDiscountPrice) {
        recordStep(SKU_DISCOUNTS, SKU_DISCOUNT_DESCRIPTION, stepIndex, afterCrossPrice, afterDiscountPrice);
    }

    private void recordStep(String step, String description, AtomicInteger stepIndex, int beforePrice, int afterPrice) {
        if(collector != null) {
            collector.recordStep(step, stepIndex.get()-1, description, beforePrice, afterPrice);
        }
    }
}
