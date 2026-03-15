package com.tdd.api;

import com.tdd.PriceCalculator;
import com.tdd.PricingRules;
import com.tdd.RuleEngine;
import com.tdd.engine.RuleContext;
import com.tdd.tracing.RuleTracer;
import com.tdd.tracing.debug.PricingTrace;
import com.tdd.tracing.debug.PricingTraceCollector;
import com.tdd.tracing.inspector.RuleInspector;
import com.tdd.tracing.RuleTrace;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PricingEngineService {

    public RuleTrace evaluate(Map<String, Long> cart, String ruleSetName) {
        PricingRules rules = RuleSetRegistry.get(ruleSetName);
        PriceCalculator calculator = new PriceCalculator(rules);

        RuleTracer tracer = new RuleTracer();
        RuleEngine engine = new RuleEngine(rules, tracer);

        RuleContext ctx = new RuleContext(cart, Map.of());
        ctx = engine.evaluate(ctx);

        RuleInspector inspector = new RuleInspector(rules, calculator);
        return inspector.inspect(ctx, tracer.getEvents());
    }

    public PricingTrace getTrace(Map<String, Long> cart, String ruleSetName) {
        PricingRules rules = RuleSetRegistry.get(ruleSetName);

        PricingTraceCollector collector = new PricingTraceCollector();
        RuleTracer tracer = new RuleTracer();
        RuleEngine engine = new RuleEngine(rules,  tracer);

        RuleContext ctx = new RuleContext(cart, Map.of());
        int finalTotal = engine.evaluate(ctx, collector);

        PricingTrace trace = collector.build();
        trace.setFinalPrice(finalTotal);
        return trace;
    }
}