package com.tdd.api;

import com.tdd.calculation.PriceCalculator;
import com.tdd.PricingRules;
import com.tdd.calculation.dp.BestPriceAlgorithm;
import com.tdd.engine.RuleEngine;
import com.tdd.api.rest.PricingRequest;
import com.tdd.engine.utility.RuleContext;
import com.tdd.tracing.RuleTracer;
import com.tdd.tracing.debug.*;
import com.tdd.tracing.inspector.RuleInspector;
import com.tdd.tracing.RuleTrace;
import org.springframework.stereotype.Service;

import java.util.Map;

import static com.tdd.api.ServiceUtils.fromRequest;

@Service
public class PricingEngineService {
    public static final String ENGINE_VERSION = "v1";

    public RuleTrace evaluate(Map<String, Long> cart, String ruleSetName) {
        PricingRules rules = RuleSetRegistry.get(ruleSetName);
        RuleTracer tracer = new RuleTracer();

        RuleContext ctx = runEngine(cart, rules, tracer);

        return runInspect(rules, ctx, tracer);
    }

    public PricingTrace getTrace(PricingRequest request) {
        PricingRules rules = RuleSetRegistry.get(request.getRuleSet());
        CartSnapshot cartSnapshot = fromRequest(request, rules);

        PricingTraceCollector collector = new PricingTraceCollector(cartSnapshot, request.getRuleSet(), ENGINE_VERSION);

        RuleContext ctx = runEngine(rules, collector, cartSnapshot);

        return buildResult(rules, collector, ctx);
    }

    private RuleContext runEngine(Map<String, Long> cart, PricingRules rules, RuleTracer tracer) {
        RuleEngine engine = new RuleEngine(rules, tracer, null);

        return engine.evaluate(new RuleContext(cart, Map.of()));
    }

    private RuleContext runEngine(PricingRules rules, PricingTraceCollector collector, CartSnapshot cartSnapshot) {
        RuleEngine engine = new RuleEngine(rules, new RuleTracer(), collector);

        return engine.evaluate(RuleContext.fromCart(cartSnapshot));
    }

    private RuleTrace runInspect(PricingRules rules, RuleContext ctx, RuleTracer tracer) {
        RuleInspector inspector = new RuleInspector(rules, new BestPriceAlgorithm(rules, null));
        return inspector.inspect(ctx, tracer.getEvents());
    }

    private PricingTrace buildResult(PricingRules rules, PricingTraceCollector collector, RuleContext ctx) {
        int finalPrice = new PriceCalculator(rules, collector).calculateTotal(ctx);

        collector.setFinalPrice(finalPrice);

        return collector.build();
    }
}