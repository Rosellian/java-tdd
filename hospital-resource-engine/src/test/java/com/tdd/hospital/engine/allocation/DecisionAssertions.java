package com.tdd.hospital.engine.allocation;

import com.tdd.hospital.patients.Patient;
import com.tdd.hospital.resources.Resource;
import com.tdd.hospital.tracing.TraceStep;

import java.util.List;

import static com.tdd.hospital.engine.TraceAssertions.assertTraces;
import static com.tdd.hospital.engine.allocation.AllocationStatus.ALLOCATED;
import static com.tdd.hospital.engine.allocation.AllocationStatus.WAIT;
import static com.tdd.hospital.tracing.TraceType.*;
import static org.junit.jupiter.api.Assertions.*;

public class DecisionAssertions {

    public static void assertNotAllocated(Resource expectedResource, Patient expectedPatient,
                                          AllocationDecision decision) {
        List<TraceStep> expectedTrace = List.of(
                new TraceStep("RequiredResource", expectedResource.type().name(), RULE_MATCH),
                new TraceStep(expectedResource.id().toString(), "Resource busy", RESOURCE_BUSY),
                new TraceStep("Fallback", "No resources available → " + WAIT.name(), FALLBACK));

        AllocationDecision expected = new AllocationDecision(expectedPatient.id(), null, WAIT, expectedTrace);

        assertAllocation(expected, decision);
    }

    public static void assertAllocated(Resource expectedResource, Patient expectedPatient,
                                                AllocationDecision decision) {
        List<TraceStep> expectedTrace = List.of(
                new TraceStep("RequiredResource",  expectedResource.type().name(), RULE_MATCH),
                new TraceStep(expectedResource.id().toString(), "Resource available", RESOURCE_OK));

        AllocationDecision expected = new AllocationDecision(expectedPatient.id(), expectedResource.id(),
                ALLOCATED, expectedTrace);

        assertAllocation(expected, decision);
    }

    private static void assertAllocation(AllocationDecision expected, AllocationDecision decision) {
        assertEquals(expected.status(), decision.status());
        assertEquals(expected.resourceId(), decision.resourceId());
        assertEquals(expected.patientId(), decision.patientId());

        assertTraces(expected.trace(), decision.trace());
    }
}
