package com.tdd.hospital.engine.triage;

import com.tdd.hospital.patients.TriageLevel;
import com.tdd.hospital.tracing.TraceStep;

import java.util.List;

public record TriageResult(
        TriageLevel level,
        List<TraceStep> trace
) {}
