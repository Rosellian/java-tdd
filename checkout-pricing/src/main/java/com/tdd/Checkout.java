package com.tdd;

import com.tdd.engine.RuleContext;
import com.tdd.tracing.RuleTracer;
import com.tdd.tracing.inspector.RuleInspector;
import com.tdd.tracing.inspector.RuleInspectorView;
import com.tdd.tracing.RuleTrace;

import java.util.*;
import java.util.stream.Collectors;

public class Checkout {
    public  final RuleTracer debugger = new RuleTracer();
    private final PricingRules rules;
    private final RuleEngine ruleEngine;
    private final PriceCalculator calculator;

    private final List<String> items = new ArrayList<>();

    public Checkout(PricingRules rules) {
        this.rules = rules;
        ruleEngine = new RuleEngine(rules, debugger);
        calculator = new PriceCalculator(rules);
    }

    public void scan(String unit) {
        items.add(unit);
    }

    public int total() {
        RuleContext context = new RuleContext(countItems(), new HashMap<>());

        context = ruleEngine.evaluate(context);

        display(context);

        return calculator.calculateTotal(context, null);
    }

    private void display(RuleContext context) {
        RuleInspector inspector = new RuleInspector(rules, calculator);
        RuleTrace trace = inspector.inspect(context, debugger.getEvents());

        RuleInspectorView.print(trace);
        for(var dp : trace.dpTraces()) {
            RuleInspectorView.printDP(dp);
        }
    }

    private Map<String, Long> countItems() {
        return items.stream()
                .collect(Collectors.groupingBy(sku -> sku, Collectors.counting()));
    }
}
