package com.tdd.hospital.engine.triage;

import com.tdd.hospital.engine.triage.rules.TriageLevel;
import com.tdd.hospital.tracing.TraceStep;

import java.util.List;

public record TriageResult(
        TriageLevel level,
        List<TraceStep> trace
) {}
