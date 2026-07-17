package com.tdd.hospital.engine;

import com.tdd.hospital.engine.triage.rules.TriageConfig;
import com.tdd.hospital.engine.triage.rules.TriageRule;

import java.util.List;

public class RuleUtils {
    //TODO Find a better way to reference rules
    public static final List<TriageRule> DEFAULT_TRIAGE_RULES = new TriageConfig().defaultRules();

    public static final TriageRule
            CRITICAL_OXYGEN = DEFAULT_TRIAGE_RULES.getFirst(),
            HIGH_FEVER = DEFAULT_TRIAGE_RULES.get(1),
            LOW_BLOOD_PRESSURE = DEFAULT_TRIAGE_RULES.get(2),
            MILD_SYMPTOMS = DEFAULT_TRIAGE_RULES.get(3);
}
