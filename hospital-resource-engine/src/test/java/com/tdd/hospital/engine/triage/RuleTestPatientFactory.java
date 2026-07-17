package com.tdd.hospital.engine.triage;

import com.tdd.hospital.engine.triage.rules.TriageRule;
import com.tdd.hospital.patients.Patient;
import com.tdd.hospital.patients.VitalSigns;

import java.util.List;
import java.util.UUID;
import java.util.function.Function;

public class RuleTestPatientFactory {

    public static Patient matching(TriageRule rule) {
        Patient base = createBasePatient();

        return switch (rule.id()) {
            case "r1" -> baseWithVitals(base, vs -> vs.withOxygenSaturation(80));
            case "r2" -> baseWithVitals(base, vs -> vs.withTemperature(40.0));
            case "r3" -> baseWithVitals(base, vs -> vs.withSystolicBP(85));
            case "r4" -> baseWithSymptoms(base, List.of("headache"));
            default -> throw new IllegalStateException("No matching generator for rule: " + rule.id());
        };
    }

    private static Patient createBasePatient() {
        return new Patient(
                UUID.randomUUID().toString(), "Test Patient", 40,
                new VitalSigns(100, 120, 80, 98, 37.0),
                List.of(), null);
    }

    private static Patient baseWithVitals(Patient base, Function<VitalSigns, VitalSigns> f) {
        VitalSigns updated = f.apply(base.vitals());

        return new Patient(base.id(), base.name(), base.age(), updated, base.symptoms(), null);
    }

    private static Patient baseWithSymptoms(Patient base, List<String> symptoms) {
        return new Patient(base.id(), base.name(), base.age(), base.vitals(), symptoms, null);
    }
}
