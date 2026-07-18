package com.tdd.hospital.engine.allocation;

import com.tdd.hospital.patients.Patient;
import com.tdd.hospital.engine.triage.rules.TriageLevel;
import com.tdd.hospital.resources.Resource;
import com.tdd.hospital.resources.ResourceType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.UUID;

import static com.tdd.hospital.engine.PatientUtils.PATIENT_1;
import static com.tdd.hospital.engine.PatientUtils.from;
import static com.tdd.hospital.engine.allocation.DecisionAssertions.*;

public class ResourceAllocatorTest {
    private static final Patient PATIENT_1_RED = from(PATIENT_1, TriageLevel.RED);
    private static final UUID ICU_BED_1 = UUID.randomUUID();


    private ResourceAllocator allocator;

    @BeforeEach
    void setup() {
        allocator = new ResourceAllocator();
    }

    @Test
    void redPatientGetsIcuBedIfAvailable() {
        Resource icu = new Resource(ICU_BED_1, ResourceType.ICU_BED, 1, 0);
        Patient patient = PATIENT_1_RED;

        AllocationDecision decision = allocator.allocate(patient, List.of(icu));

        assertAllocated(icu, patient, decision);
    }

    @Test
    void busyResourceCausesWait() {
        Resource icu = new Resource(ICU_BED_1, ResourceType.ICU_BED, 1, 1);
        Patient patient = PATIENT_1_RED;

        AllocationDecision decision = allocator.allocate(patient, List.of(icu));

        assertNotAllocated(icu, patient, decision);
    }
}
