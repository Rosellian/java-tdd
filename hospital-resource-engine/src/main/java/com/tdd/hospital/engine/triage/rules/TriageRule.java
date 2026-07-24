package com.tdd.hospital.engine.triage.rules;

import com.tdd.hospital.engine.triage.rules.condition.Condition;
import com.tdd.hospital.engine.triage.rules.database.dto.ConditionDTO;

import java.util.UUID;

public record TriageRule(
        UUID id,
        String name,
        Condition condition,
        ConditionDTO conditionDTO,
        String description,
        TriageLevel result
) {}
