package com.tdd.hospital.engine.allocation;

import com.tdd.hospital.tracing.TraceStep;

import java.util.List;

public record AllocationDecision(
        String patientId,
        String resourceId,
        AllocationStatus status,
        List<TraceStep> trace
) {}
