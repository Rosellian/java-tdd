package com.tdd.hospital.engine.allocation;

import com.tdd.hospital.patients.Patient;
import com.tdd.hospital.patients.TriageLevel;
import com.tdd.hospital.resources.Resource;
import com.tdd.hospital.resources.ResourceType;
import com.tdd.hospital.tracing.TraceStep;
import com.tdd.hospital.tracing.TraceType;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ResourceAllocator {

    public AllocationDecision allocate(Patient patient, List<Resource> resources) {
        List<TraceStep> trace =  new ArrayList<>();

        ResourceType needed = requiredResource(patient.triageLevel());
        trace.add(new TraceStep("RequiredResource", needed.name(), TraceType.RULE_MATCH));

        for(Resource resource : resources) {
            if(resource.type() == needed) {
                if(resource.used() < resource.capacity()) {
                    trace.add(new TraceStep(resource.id(), "Resource available", TraceType.RESOURCE_OK));

                    return new AllocationDecision(patient.id(), resource.id(), AllocationStatus.ALLOCATED, trace);
                }
                else {
                    trace.add(new TraceStep(resource.id(), "Resource busy", TraceType.RESOURCE_BUSY));
                }
            }
        }

        trace.add(new TraceStep("Fallback", "No resources available → " + AllocationStatus.WAIT.name(),
                TraceType.FALLBACK));

        return new AllocationDecision(patient.id(), null, AllocationStatus.WAIT, trace);
    }

    private ResourceType requiredResource(TriageLevel level) {
        return switch (level) {
            case RED -> ResourceType.ICU_BED;
            case ORANGE -> ResourceType.DOCTOR;
            case YELLOW, GREEN -> ResourceType.NURSE;
        };
    }
}
