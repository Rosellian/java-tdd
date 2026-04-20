package com.tdd.utils;

import com.tdd.PricingRules;
import com.tdd.calculation.PriceCalculator;
import com.tdd.calculation.dp.BestPriceAlgorithm;
import com.tdd.engine.utility.RuleContext;
import com.tdd.tracing.RuleTrace;
import com.tdd.tracing.debug.PricingTrace;
import com.tdd.tracing.debug.PricingTraceCollector;
import com.tdd.tracing.inspector.RuleInspector;
import com.tdd.tracing.inspector.RuleInspectorView;

public class ResultBuilder {
    private final PricingRules rules;
    private final PriceCalculator calculator;
    private final PricingTraceCollector collector;

    public ResultBuilder(PricingRules rules, PricingTraceCollector collector) {
        this.rules = rules;
        this.calculator = new PriceCalculator(rules, collector);
        this.collector = collector;
    }

    public TraceResult buildResult(RuleContext ctx) {
        PricingTrace pricingTrace = buildPricingTrace(ctx);
        RuleTrace ruleTrace = runInspect(ctx);

        return new TraceResult(ruleTrace, pricingTrace);
    }

    private RuleTrace runInspect(RuleContext ctx) {
        RuleInspector inspector = new RuleInspector(rules, new BestPriceAlgorithm(rules, null));

        RuleTrace ruleTrace = inspector.inspect(ctx, collector.getEvents());
        RuleInspectorView.print(ruleTrace);

        return ruleTrace;
    }

    private PricingTrace buildPricingTrace(RuleContext ctx) {
        double finalPrice = calculator.calculateTotal(ctx);
        collector.setFinalPrice(finalPrice);
        return collector.build();
    }
}
