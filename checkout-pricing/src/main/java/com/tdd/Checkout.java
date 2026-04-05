package com.tdd;

import com.tdd.calculation.dp.BestPriceAlgorithm;
import com.tdd.calculation.PriceCalculator;
import com.tdd.engine.utility.RuleContext;
import com.tdd.engine.RuleEngine;
import com.tdd.tracing.RuleTracer;
import com.tdd.tracing.inspector.RuleInspector;
import com.tdd.tracing.inspector.RuleInspectorView;
import com.tdd.tracing.RuleTrace;

import java.util.*;
import java.util.stream.Collectors;

public class Checkout {
    private final RuleTracer tracer = new RuleTracer();
    private final PricingRules rules;
    private final RuleEngine engine;
    private final PriceCalculator calculator;

    private final List<String> items = new ArrayList<>();

    public Checkout(PricingRules rules) {
        this.rules = rules;
        engine = new RuleEngine(rules, tracer, null);
        calculator = new PriceCalculator(rules, null);
    }

    public void scan(String unit) {
        items.add(unit);
    }

    public int total() {
        RuleContext context = new RuleContext(countItems(), new HashMap<>());

        context = engine.evaluate(context);

        inspect(context);

        return calculator.calculateTotal(context);
    }

    private void inspect(RuleContext context) {
        RuleInspector inspector = new RuleInspector(rules, new BestPriceAlgorithm(rules, null));
        RuleTrace trace = inspector.inspect(context, tracer.getEvents());

        RuleInspectorView.print(trace);
    }

    private Map<String, Long> countItems() {
        return items.stream()
                .collect(Collectors.groupingBy(sku -> sku, Collectors.counting()));
    }
}
