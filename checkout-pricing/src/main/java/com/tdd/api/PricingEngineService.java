package com.tdd.api;

import com.tdd.Checkout;
import com.tdd.api.pricing.PricingRulesBuilder;
import com.tdd.utils.TraceResult;
import com.tdd.PricingRules;
import com.tdd.api.rest.trace.PricingRequest;
import com.tdd.tracing.debug.*;
import com.tdd.tracing.RuleTrace;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import static com.tdd.api.ServiceUtils.fromRequest;

@Service
public class PricingEngineService {
    private static final Logger logger = LoggerFactory.getLogger(PricingEngineService.class);

    private final PricingRulesBuilder pricingRulesBuilder;

    public PricingEngineService(PricingRulesBuilder pricingRulesBuilder) {
        this.pricingRulesBuilder = pricingRulesBuilder;
    }

    public RuleTrace evaluate(PricingRequest request) {
        return runEngine(request).ruleTrace();
    }

    public PricingTrace getTrace(PricingRequest request) {
        return runEngine(request).pricingTrace();
    }

    private TraceResult runEngine(PricingRequest request) {
        PricingRules rules = pricingRulesBuilder.from(request);
        CartSnapshot cart = fromRequest(request);

        logger.info("Running pricing engine for pricing rules: {} and with cart {}", rules, cart);

        Checkout checkout = new Checkout(rules, cart);

        return checkout.run();
    }
}