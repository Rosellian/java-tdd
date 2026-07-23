package com.tdd.hospital.engine.triage.rules;

import java.util.UUID;

public record TriageRule(
        UUID id,
        String name,
        Condition condition,
        String description,
        TriageLevel result
) {}
