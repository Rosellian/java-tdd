package com.tdd.api;

import com.tdd.logging.RuleTrace;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
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
}