package com.tdd.api;

import com.tdd.tracing.RuleTrace;
import com.tdd.tracing.debug.PricingTrace;
import org.springframework.web.bind.annotation.*;

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
        PricingTrace trace = service.getTrace(req.cart, req.ruleSet);
        return new TraceResponse(trace);
    }
}