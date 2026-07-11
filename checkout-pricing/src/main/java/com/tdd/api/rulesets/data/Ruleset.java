package com.tdd.api.rulesets.data;

import com.tdd.api.rulesets.data.rules.Rule;

import java.util.List;
import java.util.UUID;

public record Ruleset(
        UUID id,
        String name,
        String version,
        List<Rule> rules
) {}
