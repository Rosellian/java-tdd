package com.tdd.api;

import com.tdd.PriceCalculator;
import com.tdd.PricingRules;
import com.tdd.RuleEngine;
import com.tdd.engine.RuleContext;
import com.tdd.logging.RuleDebugger;
import com.tdd.logging.RuleInspector;
import com.tdd.logging.RuleTrace;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PricingEngineService {

    public RuleTrace evaluate(Map<String, Long> cart, String ruleSetName) {

        PricingRules rules = RuleSetRegistry.get(ruleSetName);
        PriceCalculator calculator = new PriceCalculator(rules);

        RuleDebugger debugger = new RuleDebugger();
        RuleEngine engine = new RuleEngine(rules, debugger);

        RuleContext ctx = new RuleContext(cart, Map.of());
        ctx = engine.evaluate(ctx);

        RuleInspector inspector = new RuleInspector(rules, calculator);
        return inspector.inspect(ctx, debugger.getEvents());
    }
}