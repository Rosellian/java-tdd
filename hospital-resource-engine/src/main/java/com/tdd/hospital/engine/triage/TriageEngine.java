package com.tdd.hospital.engine.triage;

import com.tdd.hospital.engine.triage.rules.TriageRule;
import com.tdd.hospital.engine.triage.tracing.StepTracer;
import com.tdd.hospital.patients.Patient;
import com.tdd.hospital.engine.triage.rules.TriageLevel;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.tdd.hospital.engine.triage.RuleResult.empty;
import static com.tdd.hospital.engine.triage.RuleResult.matched;

@Service
public class TriageEngine {

    private final List<TriageRule> rules;
    private final StepTracer tracer;

    public TriageEngine(List<TriageRule> rules) {
        this.rules = rules;
        this.tracer = new StepTracer();
    }

    public TriageResult evaluate(Patient patient) {
        for(TriageRule rule : rules) {
            RuleResult result = testRule(patient, rule);

            if (result.matched()) return result.result();
        }

        tracer.addFallbackTrace();

        return new TriageResult(TriageLevel.GREEN, tracer.getTraces());
    }

    private RuleResult testRule(Patient patient, TriageRule rule) {
        RuleResult result = empty();

        if(rule.condition().matches(patient)) {
            tracer.addMatchedTrace(rule);

            result = matched(new TriageResult(rule.result(), tracer.getTraces()));
        }
        else {
            tracer.addNotMatchedTrace(rule);
        }

        return result;
    }
}
