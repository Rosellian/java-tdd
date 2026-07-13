package com.tdd.hospital.engine.allocation;

import com.tdd.hospital.patients.Patient;
import com.tdd.hospital.resources.Resource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class DecisionAssertions {

    public static void assertNotAllocatedResource(Patient expectedPatient, AllocationDecision decision) {
        assertEquals(AllocationStatus.WAIT, decision.status());
        assertNull(decision.resourceId());
        assertEquals(expectedPatient.id(), decision.patientId());
    }

    public static void assertAllocatedResource(Resource expected, Patient expectedPatient,
                                                AllocationDecision decision) {
        assertEquals(AllocationStatus.ALLOCATED, decision.status());
        assertEquals(expected.id(), decision.resourceId());
        assertEquals(expectedPatient.id(), decision.patientId());
    }
}
