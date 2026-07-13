package com.tdd.hospital.engine.triage;

import com.tdd.hospital.tracing.TraceStep;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TraceAssertions {

    private TraceAssertions() {}

    public static void assertTraces(ExpectedTriageResult expected, TriageResult result) {
        List<ExpectedTrace> expectedTraces = expected.traces();
        List<TraceStep> traces = result.trace();
        assertEquals(expectedTraces.size(), traces.size());

        for (int i = 0; i < expectedTraces.size(); i++) {
            assertTrace(expectedTraces.get(i), traces.get(i));
        }
    }

    private static void assertTrace(ExpectedTrace expectedTrace, TraceStep trace) {
        assertTrue(trace.detail().contains(expectedTrace.expectedDetail()));
        assertEquals(expectedTrace.expectedLabel(), trace.label());
        assertEquals(expectedTrace.expectedType(), trace.type());
    }
}