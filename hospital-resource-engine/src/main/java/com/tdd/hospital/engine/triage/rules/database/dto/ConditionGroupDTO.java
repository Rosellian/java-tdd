package com.tdd.hospital.engine.triage.rules.database.dto;

import java.util.List;

public record ConditionGroupDTO(
    String type, // "AND", "OR"
    List<ConditionDTO> conditions
) {}
