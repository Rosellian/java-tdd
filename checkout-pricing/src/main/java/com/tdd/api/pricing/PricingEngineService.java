package com.tdd.api.pricing;

import com.tdd.Checkout;
import com.tdd.api.pricing.conversion.PricingRulesBuilder;
import com.tdd.utils.TraceResult;
import com.tdd.PricingRules;
import com.tdd.api.pricing.rest.PricingRequest;
import com.tdd.tracing.debug.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import static com.tdd.api.pricing.ServiceUtils.fromRequest;

@Service
public class PricingEngineService {
    private static final Logger logger = LoggerFactory.getLogger(PricingEngineService.class);

    private final PricingRulesBuilder pricingRulesBuilder;

    public PricingEngineService(PricingRulesBuilder pricingRulesBuilder) {
        this.pricingRulesBuilder = pricingRulesBuilder;
    }

    public TraceResult evaluate(PricingRequest request) {
        return runEngine(request);
    }

    private TraceResult runEngine(PricingRequest request) {
        PricingRules rules = pricingRulesBuilder.from(request);
        CartSnapshot cart = fromRequest(request);

        logger.info("Running pricing engine for pricing rules: {} and with cart {}", rules, cart);

        Checkout checkout = new Checkout(rules, cart);

        return checkout.run();
    }
}