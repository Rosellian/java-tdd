package com.tdd.hospital.engine.triage.tracing;

import com.tdd.hospital.engine.triage.rules.TriageRule;
import com.tdd.hospital.patients.TriageLevel;
import com.tdd.hospital.tracing.TraceStep;
import com.tdd.hospital.tracing.TraceType;

import java.util.ArrayList;
import java.util.List;

public class StepTracer {
    private final List<TraceStep> traces;

    public StepTracer() {
        traces = new ArrayList<>();
    }

    public void addFallbackTrace() {
        TraceStep traceStep = createFallback();

        traces.add(traceStep);
    }

    public void addMatchedTrace(TriageRule rule) {
        TraceStep traceStep = createMatched(rule);

        traces.add(traceStep);
    }
    public void addNotMatchedTrace(TriageRule rule) {
        TraceStep traceStep = createNotMatched(rule);

        traces.add(traceStep);
    }

    public List<TraceStep> getTraces() {return traces;}

    //TODO move to TraceStep class?
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
