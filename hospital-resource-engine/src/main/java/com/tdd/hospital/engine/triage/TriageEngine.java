package com.tdd.hospital.engine.triage;

import com.tdd.hospital.patients.Patient;
import com.tdd.hospital.patients.TriageLevel;
import com.tdd.hospital.tracing.TraceStep;
import com.tdd.hospital.tracing.TraceType;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TriageEngine {

    private final List<TriageRule> rules;

    public TriageEngine(List<TriageRule> rules) {
        this.rules = rules;
    }

    public TriageResult evaluate(Patient patient) {
        List<TraceStep> trace = new ArrayList<>();

        for(TriageRule rule : rules) {
            if(rule.condition().matches(patient)) {
                trace.add(new TraceStep(rule.name(), "Matched → " + rule.result(), TraceType.RULE_MATCH));

                return new TriageResult(rule.result(), trace);
            }
            else {
                trace.add(new TraceStep(rule.name(), "", TraceType.RULE_FAIL));
            }
        }

        trace.add(new TraceStep("Fallback", "No rules matched → default " + TriageLevel.GREEN.name(),
                TraceType.FALLBACK));

        return new TriageResult(TriageLevel.GREEN, trace);
    }
}
