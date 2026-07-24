package com.tdd.hospital.engine.triage.rules.database.dto;

import com.tdd.hospital.engine.triage.rules.TriageLevel;
import com.tdd.hospital.engine.triage.rules.TriageRule;

import java.util.UUID;

public record TriageRuleDTO(
        UUID id,
        String name,
        String description,
        ConditionDTO condition,
        TriageLevel result
) {

    public static TriageRuleDTO from(TriageRule rule) {
        return new TriageRuleDTO(rule.id(), rule.name(), rule.description(), rule.conditionDTO(), rule.result());
    }
}
