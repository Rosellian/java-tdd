package com.tdd.hospital.api.allocation;

import com.tdd.hospital.engine.allocation.AllocationDecision;
import com.tdd.hospital.engine.allocation.ResourceAllocator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/allocation")
public class AllocationController {
    private static final Logger logger = LoggerFactory.getLogger(AllocationController.class);

    //TODO add service layer?
    private final ResourceAllocator allocator;

    public AllocationController(ResourceAllocator allocator) {
        this.allocator = allocator;
    }

    @PostMapping
    public AllocationDecision allocate(@RequestBody AllocationRequest request) {
        logger.info("Request to allocate resources for: {} {}", request.patient(), request.resources());

        AllocationDecision decision = allocator.allocate(request.patient(), request.resources());

        logger.info("Response returned decision: {}", decision);

        return decision;
    }
}
