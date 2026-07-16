package com.tdd.hospital.engine.triage.rules;

public record TriageRule(
        String id,
        String name,
        Condition condition,
        TriageLevel result
) {}
