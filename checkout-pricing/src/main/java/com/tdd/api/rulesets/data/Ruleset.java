package com.tdd.api.rulesets.data;

import com.tdd.api.rulesets.data.rules.Rule;

import java.util.List;

public record Ruleset(
        String name,
        String version,
        List<Rule> rules
) {}
