package com.tdd.api;

import com.tdd.api.rest.*;
import com.tdd.api.rest.evaluate.EvaluateRequest;
import com.tdd.api.rest.evaluate.EvaluateResponse;
import com.tdd.api.rest.trace.TraceResponse;
import com.tdd.tracing.RuleTrace;
import com.tdd.tracing.debug.PricingTrace;
import org.springframework.web.bind.annotation.*;

import static com.tdd.api.rest.PricingRequest.fromEvaluateRequest;

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
        PricingRequest pricingRequest = fromEvaluateRequest(req);

        PricingTrace trace = service.getTrace(pricingRequest);
        return new TraceResponse(trace);
    }
}