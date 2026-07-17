package com.tdd.hospital.engine;

import com.tdd.hospital.engine.triage.rules.TriageRule;
import com.tdd.hospital.tracing.TraceStep;

import java.util.List;

import static com.tdd.hospital.tracing.TraceType.RULE_MATCH;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TraceAssertions {

    private TraceAssertions() {}

    public static void assertAtLeastMatched(TriageRule rule, List<TraceStep> trace) {
        TraceStep expectedMatchedStep = new TraceStep(rule.name(), "Matched", RULE_MATCH);

        //TODO create specific equals for TraceStep?
        boolean containsMatched = trace.stream().anyMatch(step -> matches(expectedMatchedStep, step));
        assertTrue(containsMatched);
    }

    private static boolean matches(TraceStep expectedMatchedStep, TraceStep step) {
        return step.label().equals(expectedMatchedStep.label())
                && step.detail().contains(expectedMatchedStep.detail())
                && step.type().equals(expectedMatchedStep.type());
    }

    public static void assertTraces(List<TraceStep> expectedTrace, List<TraceStep> trace) {
        assertEquals(expectedTrace.size(), trace.size());

        for (int i = 0; i < expectedTrace.size(); i++) {
            assertTrace(expectedTrace.get(i), trace.get(i));
        }
    }

    private static void assertTrace(TraceStep expectedStep, TraceStep step) {
        assertEquals(expectedStep.label(), step.label());
        assertDetail(expectedStep, step);
        assertEquals(expectedStep.type(), step.type());
    }

    private static void assertDetail(TraceStep expectedStep, TraceStep step) {
        String expectedDetail = expectedStep.detail();
        String actualDetail = step.detail();
        String failureMessage = "Expected: " + expectedDetail + ", Actual: " + actualDetail;

        assertTrue(actualDetail.contains(expectedDetail), failureMessage);
    }
}