package com.tdd.hospital.engine.triage.rules;

import com.tdd.hospital.patients.TriageLevel;

public record TriageRule(
        String id,
        String name,
        Condition condition,
        TriageLevel result
) {}
