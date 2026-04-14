package com.tdd.api;

import com.tdd.calculation.PriceCalculator;
import com.tdd.PricingRules;
import com.tdd.calculation.dp.BestPriceAlgorithm;
import com.tdd.engine.RuleEngine;
import com.tdd.api.rest.PricingRequest;
import com.tdd.engine.utility.RuleContext;
import com.tdd.tracing.debug.*;
import com.tdd.tracing.inspector.RuleInspector;
import com.tdd.tracing.RuleTrace;
import org.springframework.stereotype.Service;

import static com.tdd.api.ServiceUtils.fromRequest;

@Service
public class PricingEngineService {
    public static final String ENGINE_VERSION = "v1";

    public RuleTrace evaluate(PricingRequest request) {
        return runEngine(request).ruleTrace();
    }

    public PricingTrace getTrace(PricingRequest request) {
        return runEngine(request).pricingTrace();
    }

    private TraceResult runEngine(PricingRequest request) {
        PricingRules rules = RuleSetRegistry.get(request.getRuleSet());
        CartSnapshot cart = fromRequest(request, rules);

        PricingTraceCollector collector = new PricingTraceCollector(cart, request.getRuleSet(), ENGINE_VERSION);

        RuleEngine engine = new RuleEngine(rules, collector);
        RuleContext ctx = engine.evaluate(RuleContext.fromCart(cart));

        return buildResult(rules, collector, ctx);
    }

    private record TraceResult(RuleTrace ruleTrace, PricingTrace pricingTrace) {}

    private RuleTrace runInspect(PricingRules rules, PricingTraceCollector collector, RuleContext ctx) {
        RuleInspector inspector = new RuleInspector(rules, new BestPriceAlgorithm(rules, null));
        return inspector.inspect(ctx, collector.getEvents());
    }

    private TraceResult buildResult(PricingRules rules, PricingTraceCollector collector,
                                    RuleContext ctx) {
        PricingTrace pricingTrace = buildPricingTrace(rules, collector, ctx);
        RuleTrace ruleTrace = runInspect(rules, collector, ctx);

        return new TraceResult(ruleTrace, pricingTrace);
    }

    private static PricingTrace buildPricingTrace(PricingRules rules, PricingTraceCollector collector,
                                                  RuleContext ctx) {
        int finalPrice = new PriceCalculator(rules, collector).calculateTotal(ctx);
        collector.setFinalPrice(finalPrice);
        return collector.build();
    }
}