package com.tdd.api.pricing;

import com.tdd.api.pricing.rest.PricingResponse;
import com.tdd.api.pricing.rest.PricingRequest;
import com.tdd.utils.TraceResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import static com.tdd.api.pricing.rest.PricingResponse.from;

@RestController
@RequestMapping(value = "/api/pricing", produces = "application/json; charset=utf-8")
public class PricingController {
    private static final Logger logger = LoggerFactory.getLogger(PricingController.class);

    private final PricingEngineService service;

    public PricingController(PricingEngineService service) {
        this.service = service;
    }

    @PostMapping("/evaluate")
    public PricingResponse evaluate(@RequestBody PricingRequest request) {
        logger.info("Incoming evaluate request {}", request);

        TraceResult result = service.evaluate(request);

        PricingResponse response = from(result);
        logger.info("Evaluate response {}", response);

        return response;
    }
}