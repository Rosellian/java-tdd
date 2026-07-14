package com.tdd.hospital.engine.triage.tracing;

import com.tdd.hospital.engine.triage.rules.TriageRule;
import com.tdd.hospital.patients.TriageLevel;
import com.tdd.hospital.tracing.TraceStep;
import com.tdd.hospital.tracing.TraceType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

public class StepTracer {
    private static final Logger logger = LoggerFactory.getLogger(StepTracer.class);

    private final List<TraceStep> traces;

    public StepTracer() {
        traces = new ArrayList<>();
    }

    public void addFallbackTrace() {
        TraceStep traceStep = createFallback();

        traces.add(traceStep);
        logger.info("Fallback reached {}", traces);
    }

    public void addMatchedTrace(TriageRule rule) {
        TraceStep traceStep = createMatched(rule);

        traces.add(traceStep);
        logger.info("Matched rule {}", traces);
    }
    public void addNotMatchedTrace(TriageRule rule) {
        TraceStep traceStep = createNotMatched(rule);

        traces.add(traceStep);
        logger.info("Rule not matched {}", traces);
    }

    public List<TraceStep> getTraces() {return traces;}

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
