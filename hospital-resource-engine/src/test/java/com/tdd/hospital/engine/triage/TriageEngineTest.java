package com.tdd.hospital.engine.triage;

import com.tdd.hospital.patients.TriageLevel;
import org.junit.jupiter.api.Test;

import java.util.List;

import static com.tdd.hospital.engine.PatientUtils.PATIENT_1;
import static com.tdd.hospital.engine.RuleUtils.CRITICAL_VITALS;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TriageEngineTest {

    @Test
    void redPatientGetsRedTriage() {
        TriageEngine engine = new TriageEngine(List.of(CRITICAL_VITALS));

        TriageResult result = engine.evaluate(PATIENT_1);

        assertResult(result);
    }

    private static void assertResult(TriageResult result) {
        assertEquals(TriageLevel.RED, result.level());
        assertEquals(1, result.trace().size());
    }
}
