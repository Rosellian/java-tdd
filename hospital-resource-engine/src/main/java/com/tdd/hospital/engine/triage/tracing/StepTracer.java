package com.tdd.hospital.engine.triage.tracing;

import com.tdd.hospital.engine.triage.rules.TriageRule;
import com.tdd.hospital.engine.triage.rules.TriageLevel;
import com.tdd.hospital.tracing.TraceStep;
import com.tdd.hospital.tracing.TraceType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

public class StepTracer {
    private static final Logger logger = LoggerFactory.getLogger(StepTracer.class);

    private final List<TraceStep> trace;

    public StepTracer() {
        trace = new ArrayList<>();
    }

    public void addFallbackTrace() {
        TraceStep traceStep = createFallback();

        trace.add(traceStep);
        logger.info("Fallback reached {}", trace);
    }

    public void addMatchedTrace(TriageRule rule) {
        TraceStep traceStep = createMatched(rule);

        trace.add(traceStep);
        logger.info("Matched rule {}", trace);
    }
    public void addNotMatchedTrace(TriageRule rule) {
        TraceStep traceStep = createNotMatched(rule);

        trace.add(traceStep);
        logger.info("Rule not matched {}", trace);
    }

    //TODO Redesign to avoid the need to clear list in between runs?
    public List<TraceStep> getTraces(boolean clear) {
        List<TraceStep> traceCopy = new ArrayList<>(trace);

        if(clear) {
            trace.clear();
        }

        return traceCopy;
    }

    //TODO move to TraceStep or other class?
    private TraceStep createMatched(TriageRule rule) {
        return new TraceStep(rule.name(), "Matched → " + rule.result(), TraceType.RULE_MATCH);
    }

    private TraceStep createNotMatched(TriageRule rule) {
        return new TraceStep(rule.name(), "Did not match", TraceType.RULE_FAIL);
    }

    private TraceStep createFallback() {
        return new TraceStep("Fallback","No rules matched → default " + TriageLevel.GREEN.name(),
                TraceType.FALLBACK);
    }
}
