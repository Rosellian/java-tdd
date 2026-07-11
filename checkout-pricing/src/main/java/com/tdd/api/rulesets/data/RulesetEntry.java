package com.tdd.api.rulesets.data;

import java.util.UUID;

public record RulesetEntry(
        UUID id,
        String name,
        String version
) {}
