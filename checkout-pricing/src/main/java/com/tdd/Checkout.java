package com.tdd;

import com.tdd.calculation.dp.BestPriceAlgorithm;
import com.tdd.calculation.PriceCalculator;
import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.RuleEngine;
import com.tdd.tracing.debug.CartSnapshot;
import com.tdd.tracing.debug.PricingTrace;
import com.tdd.tracing.debug.PricingTraceCollector;
import com.tdd.tracing.inspector.RuleInspector;
import com.tdd.tracing.inspector.RuleInspectorView;
import com.tdd.tracing.RuleTrace;
import com.tdd.utils.Cart;
import com.tdd.utils.TraceResult;

import java.util.*;

public class Checkout {
    public static final String ENGINE_VERSION = "v1";

    private final PricingRules rules;
    private final PricingTraceCollector collector;
    private final RuleEngine engine;
    private final PriceCalculator calculator;
    private final Cart cartHandler;

    private Checkout(PricingRules rules, PricingTraceCollector collector, CartSnapshot cart) {
        this.rules = rules;
        this.collector = collector;
        engine = new RuleEngine(rules, collector);
        calculator = new PriceCalculator(rules, collector);
        cartHandler = new Cart(rules, cart);
    }

    public Checkout(PricingRules rules) {
        this(rules, new PricingTraceCollector(), CartSnapshot.from(new ArrayList<>()));
    }

    public Checkout(PricingRules rules, CartSnapshot cart, String ruleSet) {
        this(rules, new PricingTraceCollector(cart, ruleSet, ENGINE_VERSION), cart);
    }

    public void scan(String unit) {
        cartHandler.add(unit);
    }

    public int total() {
        TraceResult result = run();

        return result.ruleTrace().finalTotal();
    }

    public TraceResult run() {
        CartSnapshot cart = cartHandler.getCart();
        collector.setCart(cart);

        RuleContext ctx = engine.evaluate(RuleContext.fromCart(cart));

        return buildResult(ctx);
    }

    private TraceResult buildResult(RuleContext ctx) {
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
        int finalPrice = calculator.calculateTotal(ctx);
        collector.setFinalPrice(finalPrice);
        return collector.build();
    }
}
