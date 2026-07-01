package com.tdd.api.rulesets.data;

public record CachedRuleset(
        RulesetEntry entry,
        Ruleset ruleset
) {

    public static CachedRuleset from(Ruleset ruleset) {
        RulesetEntry entry = new RulesetEntry(ruleset.id(), ruleset.name(), ruleset.version());

        return new CachedRuleset(entry, ruleset);
    }
}
