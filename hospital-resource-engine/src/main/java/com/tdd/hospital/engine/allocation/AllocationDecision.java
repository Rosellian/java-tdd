package com.tdd.hospital.engine.allocation;

import com.tdd.hospital.tracing.TraceStep;

import java.util.List;
import java.util.UUID;

public record AllocationDecision(
        UUID patientId,
        UUID resourceId,
        AllocationStatus status,
        List<TraceStep> trace
) {}
