package com.tdd.api;

import com.tdd.Checkout;
import com.tdd.utils.TraceResult;
import com.tdd.PricingRules;
import com.tdd.api.rest.PricingRequest;
import com.tdd.tracing.debug.*;
import com.tdd.tracing.RuleTrace;
import org.springframework.stereotype.Service;

import static com.tdd.api.ServiceUtils.fromRequest;

@Service
public class PricingEngineService {

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

        Checkout checkout = new Checkout(rules, cart, ruleSet);

        return checkout.run();
    }
}