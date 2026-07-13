package com.tdd.hospital.engine.allocation;

import com.tdd.hospital.patients.Patient;
import com.tdd.hospital.patients.TriageLevel;
import com.tdd.hospital.resources.Resource;
import com.tdd.hospital.resources.ResourceType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static com.tdd.hospital.engine.PatientUtils.PATIENT_1;
import static com.tdd.hospital.engine.PatientUtils.from;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class ResourceAllocatorTest {
    private static final Patient PATIENT_1_RED = from(PATIENT_1, TriageLevel.RED);

    private ResourceAllocator allocator;

    @BeforeEach
    void setup() {
        allocator = new ResourceAllocator();
    }

    @Test
    void redPatientGetsIcuBedIfAvailable() {
        Resource icu = new Resource("icu1", ResourceType.ICU_BED, 1, 0);
        Patient patient = PATIENT_1_RED;

        AllocationDecision decision = allocator.allocate(patient, List.of(icu));

        assertAllocatedResource(icu, patient, decision);
    }

    @Test
    void busyResourceCausesWait() {
        Resource icu = new Resource("icu1", ResourceType.ICU_BED, 1, 1);
        Patient patient = PATIENT_1_RED;

        AllocationDecision decision = allocator.allocate(patient, List.of(icu));

        assertNotAllocatedResource(patient, decision);
    }

    private static void assertNotAllocatedResource(Patient expectedPatient, AllocationDecision decision) {
        assertEquals(AllocationStatus.WAIT, decision.status());
        assertNull(decision.resourceId());
        assertEquals(expectedPatient.id(), decision.patientId());
    }

    private static void assertAllocatedResource(Resource expected, Patient expectedPatient,
                                                AllocationDecision decision) {
        assertEquals(AllocationStatus.ALLOCATED, decision.status());
        assertEquals(expected.id(), decision.resourceId());
        assertEquals(expectedPatient.id(), decision.patientId());
    }
}
