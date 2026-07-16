package com.tdd.hospital.engine;

import com.tdd.hospital.engine.triage.rules.TriageRule;
import com.tdd.hospital.engine.triage.rules.TriageLevel;

public class RuleUtils {
    public static final TriageRule CRITICAL_VITALS = createRuleCriticalVitals("r1", "CriticalVitals");

    static TriageRule createRuleCriticalVitals(String id, String name) {
        return new TriageRule("r1",name,
                p -> p.vitals().oxygenSaturation() < 85, TriageLevel.RED);
    }
}
