package com.tdd.calculation.dp.candidate;

import com.tdd.rules.PricingOption;
import com.tdd.tracing.debug.PricingTraceCollector;
import com.tdd.tracing.debug.RuleTrace;

public class CandidateRecorder {
    private final String sku;
    private final PricingTraceCollector collector;

    CandidateRecorder(String sku, PricingTraceCollector collector) {
        this.sku = sku;
        this.collector = collector;
    }

    void recordSkuRule(int stepIndex, PricingOption opt, double current, double candidate, boolean isBetterCandidate) {
        RuleTrace rt = new RuleTrace();
        rt.setId(opt.id());
        rt.setName(opt.name());
        rt.setSku(sku);
        rt.setStepIndex(stepIndex);
        rt.setBefore(current);
        rt.setAfter(candidate);
        rt.setDelta(candidate - current);
        rt.setMatched(isBetterCandidate);
        if(!isBetterCandidate) rt.setReason("Rule not giving better price candidate");

        if(collector != null) {
            collector.recordRule(rt);
        }
    }
}
