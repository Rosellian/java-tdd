package com.tdd.calculation.dp.utility;

import com.tdd.rules.PricingOption;
import com.tdd.tracing.debug.PricingTraceCollector;
import com.tdd.tracing.debug.RuleTrace;

import java.util.HashSet;
import java.util.Set;

public class SkuRuleRecorder {
    private final Set<AppliedSkuRule> appliedRules;
    private final String sku;
    private final PricingTraceCollector collector;

    public SkuRuleRecorder(String sku, PricingTraceCollector collector) {
        this.appliedRules = new HashSet<>();
        this.sku = sku;
        this.collector = collector;
    }

    public void addAppliedSkuRule(int stepIndex, PricingOption skuRule, double unitPrice) {
        RuleTrace rt = createTrace(stepIndex, skuRule);

        appliedRules.add(new AppliedSkuRule(skuRule, rt, unitPrice));
    }

    private RuleTrace createTrace(int stepIndex, PricingOption skuRule) {
        RuleTrace rt = new RuleTrace();
        rt.setId(skuRule.id());
        rt.setName(skuRule.name());
        rt.setSku(sku);
        rt.setStepIndex(stepIndex);
        rt.setMatched(true);

        return rt;
    }

    public void recordTrace(int count, double finalPrice) {
        for (AppliedSkuRule appliedRule : appliedRules) {
            RuleTrace trace = appliedRule.trace();

            double before = appliedRule.unitPrice() * count;

            addPrices(finalPrice, trace, before);

            if(collector != null) {
                collector.recordRule(trace);
            }
        }
    }

    private void addPrices(double finalPrice, RuleTrace trace, double before) {
        trace.setBefore(before);
        trace.setAfter(finalPrice);
        trace.setDelta(finalPrice - before);
    }
}
