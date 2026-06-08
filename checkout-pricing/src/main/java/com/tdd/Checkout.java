package com.tdd;

import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.RuleEngine;
import com.tdd.tracing.debug.CartSnapshot;
import com.tdd.tracing.debug.PricingTraceCollector;
import com.tdd.utils.Cart;
import com.tdd.utils.ResultBuilder;
import com.tdd.utils.TraceResult;

import java.util.*;

public class Checkout {
    public static final String ENGINE_VERSION = "v1";

    private final PricingTraceCollector collector;
    private final RuleEngine engine;
    private final Cart cartHandler;
    private final ResultBuilder resultBuilder;

    private Checkout(PricingRules rules, PricingTraceCollector collector, CartSnapshot cart) {
        this.collector = collector;
        engine = new RuleEngine(rules, collector);
        cartHandler = new Cart(cart);
        resultBuilder = new ResultBuilder(rules, collector);
    }

    public Checkout(PricingRules rules) {
        CartSnapshot emptyCart = CartSnapshot.from(new ArrayList<>());
        this(rules, new PricingTraceCollector(), emptyCart);
    }

    public Checkout(PricingRules rules, CartSnapshot cart) {
        PricingTraceCollector collector = new PricingTraceCollector(cart, rules.getRuleset(), ENGINE_VERSION);
        this(rules, collector, cart);
    }

    public void scan(String unit) {
        cartHandler.add(unit);
    }

    public double total() {
        TraceResult result = run();

        return result.ruleTrace().finalTotal();
    }

    public TraceResult run() {
        CartSnapshot cart = cartHandler.getCart();
        collector.setCart(cart);

        RuleContext inputContext = RuleContext.fromCart(cart);
        RuleContext ctx = engine.evaluate(inputContext);

        return resultBuilder.buildResult(ctx);
    }
}
