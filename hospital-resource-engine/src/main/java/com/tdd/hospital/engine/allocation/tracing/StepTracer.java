package com.tdd.hospital.engine.allocation.tracing;

import com.tdd.hospital.resources.Resource;
import com.tdd.hospital.resources.ResourceType;
import com.tdd.hospital.tracing.TraceStep;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

import static com.tdd.hospital.engine.allocation.AllocationStatus.WAIT;
import static com.tdd.hospital.tracing.TraceType.*;

public class StepTracer {
    private static final Logger logger = LoggerFactory.getLogger(StepTracer.class);

    private final List<TraceStep> trace;

    public StepTracer() {trace = new ArrayList<>();}

    public void addRequired(ResourceType needed) {
        trace.add(new TraceStep("RequiredResource", needed.name(), RULE_MATCH));
        logger.info("Resource needed {}", trace);
    }

    public void addAvailable(Resource resource) {
        trace.add(new TraceStep(resource.id(), "Resource available", RESOURCE_OK));
        logger.info("Resource available {}", trace);
    }

    public void addBusy(Resource resource) {
        trace.add(new TraceStep(resource.id(), "Resource busy", RESOURCE_BUSY));
        logger.info("Resource busy {}", trace);
    }

    public void addFallback() {
        trace.add(new TraceStep("Fallback", "No resources available → " + WAIT.name(), FALLBACK));
        logger.info("Fallback reached {}", trace);
    }

    public List<TraceStep> getTrace() {return trace;}
}
