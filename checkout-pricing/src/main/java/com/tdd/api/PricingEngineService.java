package com.tdd.api;

import com.tdd.calculation.PriceCalculator;
import com.tdd.PricingRules;
import com.tdd.calculation.dp.BestPriceAlgorithm;
import com.tdd.engine.RuleEngine;
import com.tdd.api.rest.PricingRequest;
import com.tdd.engine.RuleContext;
import com.tdd.tracing.RuleTracer;
import com.tdd.tracing.debug.*;
import com.tdd.tracing.inspector.RuleInspector;
import com.tdd.tracing.RuleTrace;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

@Service
public class PricingEngineService {
    public static final String ENGINE_VERSION = "v1";

    public RuleTrace evaluate(Map<String, Long> cart, String ruleSetName) {
        PricingRules rules = RuleSetRegistry.get(ruleSetName);

        RuleTracer tracer = new RuleTracer();
        RuleEngine engine = new RuleEngine(rules, tracer);

        RuleContext ctx = new RuleContext(cart, Map.of());
        ctx = engine.evaluate(ctx);

        RuleInspector inspector = new RuleInspector(rules, new BestPriceAlgorithm(rules, null));
        return inspector.inspect(ctx, tracer.getEvents());
    }

    public PricingTrace getTrace(PricingRequest request) {
        PricingRules rules = RuleSetRegistry.get(request.getRuleSet());
        CartSnapshot cartSnapshot = toCartSnapshot(request, rules);

        PricingTraceCollector collector = new PricingTraceCollector(cartSnapshot,
                request.getRuleSet(), ENGINE_VERSION);
        RuleTracer tracer = new RuleTracer();
        RuleEngine engine = new RuleEngine(rules, tracer);

        RuleContext ctx = RuleContext.fromCart(cartSnapshot);
        ctx = engine.evaluate(ctx, collector);

        PriceCalculator calculator = new PriceCalculator(rules, collector);
        int finalPrice = calculator.calculateTotal(ctx);

        collector.setFinalPrice(finalPrice);
        return collector.build();
    }

    private CartSnapshot toCartSnapshot(PricingRequest req, PricingRules rules) {
        List<CartItem> items = req.getItems().stream()
                .map(item ->
                        new CartItem(item.getSku(), (int) item.getQuantity(),
                                rules.getUnitPrice(item.getSku())))
                .collect(toList());

        CustomerInfo customerInfo = null;
        if(req.getCustomer() != null) {
            customerInfo = new CustomerInfo(req.getCustomer().getId(), req.getCustomer().getSegment());
        }

        Map<String, Object> context = req.getContext() != null ? req.getContext() : Map.of();

        return new CartSnapshot(items, customerInfo, context);
    }
}