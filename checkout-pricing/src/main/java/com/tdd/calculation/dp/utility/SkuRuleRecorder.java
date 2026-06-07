package com.tdd.calculation.dp.utility;

import com.tdd.rules.PricingOption;
import com.tdd.tracing.debug.PricingTraceCollector;
import com.tdd.tracing.debug.RuleTrace;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class SkuRuleRecorder {
    private static final Logger logger = LoggerFactory.getLogger(SkuRuleRecorder.class);

    private final Set<IncludedSkuRule> skuRules;
    private final String sku;
    private final double unitPrice;
    private final PricingTraceCollector collector;

    public SkuRuleRecorder(String sku, double unitPrice, PricingTraceCollector collector) {
        this.skuRules = new HashSet<>();
        this.sku = sku;
        this.unitPrice = unitPrice;
        this.collector = collector;
    }

    public void addSkuRule(int stepIndex, PricingOption skuRule) {
        RuleTrace rt = createTrace(stepIndex, skuRule);

        skuRules.add(new IncludedSkuRule(skuRule, rt));
    }

    private RuleTrace createTrace(int stepIndex, PricingOption skuRule) {
        RuleTrace rt = new RuleTrace();
        rt.setId(skuRule.id());
        rt.setName(skuRule.name());
        rt.setSku(sku);
        rt.setStepIndex(stepIndex);

        return rt;
    }

    public void recordTrace(int count, double finalPrice, List<PricingOption> finalRules) {
        for (IncludedSkuRule skuRule : skuRules) {
            RuleTrace trace = skuRule.trace();

            setMatched(trace, finalRules);

            addPrices(finalPrice, trace, count);

            if(collector != null) {
                collector.recordRule(trace);
                //TODO Find better way of logging evaluated rules
                logger.info("Adding rules {} for sku {}", finalRules, sku);
            }
        }
    }

    private void setMatched(RuleTrace rt, List<PricingOption> finalRules) {
        boolean usedInFinalPath = finalRules.stream()
                .anyMatch(rule -> rule.id().equals(rt.getId()));

        rt.setMatched(usedInFinalPath);
    }

    private void addPrices(double finalPrice, RuleTrace rt, int count) {
        double before = unitPrice * count;

        rt.setBefore(before);
        rt.setAfter(finalPrice);
        rt.setDelta(finalPrice - before);
    }
}
