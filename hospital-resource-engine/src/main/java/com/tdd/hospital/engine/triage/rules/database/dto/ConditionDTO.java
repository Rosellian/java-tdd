package com.tdd.hospital.engine.triage.rules.database.dto;

public record ConditionDTO(
        String field,
        String operator,
        String value
) {}
