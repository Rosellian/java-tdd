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
        TraceStep traceStep = createRequired(needed);

        trace.add(traceStep);
        logger.info("Resource needed {}", trace);
    }

    public void addAvailable(Resource resource) {
        TraceStep traceStep = createAvailable(resource);

        trace.add(traceStep);
        logger.info("Resource available {}", trace);
    }

    public void addBusy(Resource resource) {
        TraceStep traceStep = createBusy(resource);

        trace.add(traceStep);
        logger.info("Resource busy {}", trace);
    }

    public void addFallback() {
        TraceStep traceStep = createFallback();

        trace.add(traceStep);
        logger.info("Fallback reached {}", trace);
    }

    //TODO Redesign to avoid the need to clear list in between runs?
    public List<TraceStep> getTrace(boolean clear) {
        List<TraceStep> traceCopy = new ArrayList<>(trace);

        if(clear) {
            trace.clear();
        }

        return traceCopy;
    }

    //TODO move to TraceStep or other class?
    private static TraceStep createRequired(ResourceType needed) {
        return new TraceStep("RequiredResource", needed.name(), RULE_MATCH);
    }

    private static TraceStep createAvailable(Resource resource) {
        return new TraceStep(resource.id().toString(), "Resource available", RESOURCE_OK);
    }

    private static TraceStep createBusy(Resource resource) {
        return new TraceStep(resource.id().toString(), "Resource busy", RESOURCE_BUSY);
    }

    private static TraceStep createFallback() {
        return new TraceStep("Fallback", "No resources available → " + WAIT.name(), FALLBACK);
    }
}
