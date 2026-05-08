package com.tdd.api;

import com.tdd.api.rest.*;
import com.tdd.api.rest.evaluate.EvaluateRequest;
import com.tdd.api.rest.evaluate.EvaluateResponse;
import com.tdd.api.rest.trace.TraceResponse;
import com.tdd.tracing.RuleTrace;
import com.tdd.tracing.debug.PricingTrace;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import static com.tdd.api.rest.PricingRequest.fromEvaluateRequest;

@RestController
@RequestMapping("/api/pricing")
public class PricingController {
    private static final Logger logger = LoggerFactory.getLogger(PricingController.class);
    private final PricingEngineService service;

    public PricingController(PricingEngineService service) {
        this.service = service;
    }

    @PostMapping("/evaluate")
    public EvaluateResponse evaluate(@RequestBody EvaluateRequest req) {
        logger.info("Incoming evaluate request {}", req);

        PricingRequest request = fromEvaluateRequest(req);

        RuleTrace trace = service.evaluate(request);

        EvaluateResponse response = new EvaluateResponse(trace);
        logger.info("Evaluate response {}", response);

        return response;
    }

    @PostMapping("/trace")
    public TraceResponse getTrace(@RequestBody EvaluateRequest req) {
        logger.info("Incoming trace request {}", req);

        PricingRequest pricingRequest = fromEvaluateRequest(req);

        PricingTrace trace = service.getTrace(pricingRequest);

        TraceResponse response = new TraceResponse(trace);
        logger.info("Trace response {}", response);

        return response;
    }
}