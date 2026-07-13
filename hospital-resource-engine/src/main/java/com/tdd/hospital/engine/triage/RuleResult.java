package com.tdd.hospital.engine.triage;

public record RuleResult(
        boolean matched,
        TriageResult result
) {
    static RuleResult empty() {
        return new RuleResult(false, null);
    }

    static RuleResult matched(TriageResult result) {
        return new RuleResult(true, result);
    }
}