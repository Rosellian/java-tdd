package com.tdd.hospital.engine.allocation;

import com.tdd.hospital.engine.allocation.tracing.StepTracer;
import com.tdd.hospital.patients.Patient;
import com.tdd.hospital.engine.triage.rules.TriageLevel;
import com.tdd.hospital.resources.Resource;
import com.tdd.hospital.resources.ResourceType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.tdd.hospital.engine.allocation.AllocationStatus.ALLOCATED;
import static com.tdd.hospital.engine.allocation.AllocationStatus.WAIT;
import static com.tdd.hospital.resources.ResourceType.*;

@Service
public class ResourceAllocator {
    private static final Logger logger = LoggerFactory.getLogger(ResourceAllocator.class);

    private final StepTracer tracer;

    public ResourceAllocator() {
        this.tracer = new StepTracer();
    }

    public AllocationDecision allocate(Patient patient, List<Resource> resources) {
        ResourceType needed = requiredResource(patient.triageLevel());
        tracer.addRequired(needed);

        for(Resource resource : resources) {
            if(resource.type() == needed) {
                AllocationDecision decision = allocateRequired(patient, resource);

                if (decision != null) return decision;
            }
        }

        tracer.addFallback();

        return new AllocationDecision(patient.id(), null, WAIT, tracer.getTrace());
    }

    private AllocationDecision allocateRequired(Patient patient, Resource resource) {
        if(resource.used() < resource.capacity()) {
            tracer.addAvailable(resource);

            return new AllocationDecision(patient.id(), resource.id(), ALLOCATED, tracer.getTrace());
        }
        else {
            tracer.addBusy(resource);
        }

        return null;
    }

    private ResourceType requiredResource(TriageLevel level) {
        return switch (level) {
            case RED -> ICU_BED;
            case ORANGE -> DOCTOR;
            case YELLOW, GREEN -> NURSE;
        };
    }
}
