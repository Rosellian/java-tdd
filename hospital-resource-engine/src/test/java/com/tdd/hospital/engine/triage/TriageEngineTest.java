package com.tdd.hospital.engine.triage;

import org.junit.jupiter.api.Test;

import java.util.List;

import static com.tdd.hospital.engine.PatientUtils.PATIENT_1;
import static com.tdd.hospital.engine.RuleUtils.CRITICAL_VITALS;
import static com.tdd.hospital.engine.triage.TraceAssertions.assertTraces;
import static com.tdd.hospital.patients.TriageLevel.RED;
import static com.tdd.hospital.tracing.TraceType.RULE_MATCH;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TriageEngineTest {
    private static final ExpectedTrace EXPECTED_TRACE_MATCHED_CRITICAL_VITALS = new ExpectedTrace(
            CRITICAL_VITALS.name(), "Matched", RULE_MATCH);

    @Test
    void redPatientGetsRedTriage() {
        TriageEngine engine = new TriageEngine(List.of(CRITICAL_VITALS));

        TriageResult result = engine.evaluate(PATIENT_1);

        ExpectedTriageResult expected = new ExpectedTriageResult(RED, List.of(EXPECTED_TRACE_MATCHED_CRITICAL_VITALS));
        assertResult(expected, result);
    }

    private static void assertResult(ExpectedTriageResult expected, TriageResult result) {
        assertEquals(expected.level(), result.level());

        assertTraces(expected, result);
    }
}
