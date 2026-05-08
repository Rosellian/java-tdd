package com.tdd.api;

import com.tdd.Checkout;
import com.tdd.utils.TraceResult;
import com.tdd.PricingRules;
import com.tdd.api.rest.PricingRequest;
import com.tdd.tracing.debug.*;
import com.tdd.tracing.RuleTrace;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import static com.tdd.api.ServiceUtils.fromRequest;

@Service
public class PricingEngineService {
    private static final Logger logger = LoggerFactory.getLogger(PricingEngineService.class);

    public RuleTrace evaluate(PricingRequest request) {
        return runEngine(request).ruleTrace();
    }

    public PricingTrace getTrace(PricingRequest request) {
        return runEngine(request).pricingTrace();
    }

    private TraceResult runEngine(PricingRequest request) {
        String ruleSet = request.getRuleSet();
        PricingRules rules = RuleSetRegistry.get(ruleSet);
        CartSnapshot cart = fromRequest(request, rules);

        logger.info("Running pricing engine for ruleset {} {} with cart {}", ruleSet, rules, cart);

        Checkout checkout = new Checkout(rules, cart, ruleSet);

        return checkout.run();
    }
}