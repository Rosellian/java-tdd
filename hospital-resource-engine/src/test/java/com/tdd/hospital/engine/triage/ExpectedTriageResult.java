package com.tdd.hospital.engine.triage;

import com.tdd.hospital.patients.TriageLevel;

import java.util.List;

public record ExpectedTriageResult(
        TriageLevel level,
        List<ExpectedTrace> traces
) {}
