package com.tdd.api;

import com.tdd.api.rest.*;
import com.tdd.tracing.RuleTrace;
import com.tdd.tracing.debug.PricingTrace;
import org.springframework.web.bind.annotation.*;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/api/pricing")
public class PricingController {
    private final PricingEngineService service;

    public PricingController(PricingEngineService service) {
        this.service = service;
    }

    @PostMapping("/evaluate")
    public EvaluateResponse evaluate(@RequestBody EvaluateRequest req) {
        RuleTrace trace = service.evaluate(req.cart, req.ruleSet);
        return new EvaluateResponse(trace);
    }

    @PostMapping("/trace")
    public TraceResponse getTrace(@RequestBody EvaluateRequest req) {
        //PricingTrace trace = service.getTrace(req);
        PricingTrace trace = service.getTrace(toPricingRequest(req));
        return new TraceResponse(trace);
    }

    private PricingRequest toPricingRequest(EvaluateRequest req) {
        PricingRequest pricingRequest = new PricingRequest();
        pricingRequest.setItems(req.cart.entrySet().stream()
                .map(entry -> new CartItemRequest(entry.getKey(), entry.getValue()))
                .collect(toList()));
        pricingRequest.setRuleSet(req.ruleSet);
        return pricingRequest;
    }
}