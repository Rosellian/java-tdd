package com.tdd.hospital.engine.triage;

import com.tdd.hospital.engine.triage.rules.TriageRule;
import com.tdd.hospital.patients.Patient;
import com.tdd.hospital.tracing.TraceStep;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ArgumentsSource;

import java.util.List;

import static com.tdd.hospital.engine.PatientUtils.PATIENT_1;
import static com.tdd.hospital.engine.RuleUtils.CRITICAL_OXYGEN;
import static com.tdd.hospital.engine.RuleUtils.DEFAULT_TRIAGE_RULES;
import static com.tdd.hospital.engine.TraceAssertions.assertAtLeastMatched;
import static com.tdd.hospital.engine.TraceAssertions.assertTraces;
import static com.tdd.hospital.engine.triage.RuleTestPatientFactory.matching;
import static com.tdd.hospital.engine.triage.rules.TriageLevel.RED;
import static com.tdd.hospital.tracing.TraceType.RULE_MATCH;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TriageEngineTest {
    private static final TraceStep EXPECTED_TRACE_MATCHED_CRITICAL_OXYGEN = new TraceStep(CRITICAL_OXYGEN.name(),
            "Matched", RULE_MATCH);

    @Test
    void redPatientGetsRedTriage() {
        TriageEngine engine = new TriageEngine(DEFAULT_TRIAGE_RULES);

        TriageResult result = engine.evaluate(PATIENT_1);

        TriageResult expected = new TriageResult(RED, List.of(EXPECTED_TRACE_MATCHED_CRITICAL_OXYGEN));
        assertResult(expected, result);
    }

    @ParameterizedTest
    @ArgumentsSource(DefaultRulesProvider.class)
    void defaultRulesMatchPatient(TriageRule rule) {
        TriageEngine engine = new TriageEngine(DEFAULT_TRIAGE_RULES);
        Patient patient = matching(rule);

        TriageResult result = engine.evaluate(patient);

        assertEquals(rule.result(), result.level());

        assertAtLeastMatched(rule, result.trace());
    }

    private void assertResult(TriageResult expected, TriageResult result) {
        assertEquals(expected.level(), result.level());

        assertTraces(expected.trace(), result.trace());
    }
}
