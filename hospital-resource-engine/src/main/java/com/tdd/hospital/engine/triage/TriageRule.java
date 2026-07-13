package com.tdd.hospital.engine.triage;

import com.tdd.hospital.patients.TriageLevel;

public record TriageRule(
        String id,
        String name,
        Condition condition,
        TriageLevel result
) {}
