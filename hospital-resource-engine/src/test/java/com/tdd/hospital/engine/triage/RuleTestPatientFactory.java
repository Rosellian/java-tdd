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

        //TODO find a better, more general solution
        return switch (rule.name()) {
            case "Critical Oxygen" -> baseWithVitals(base, vs -> vs.withOxygenSaturation(80));
            case "High Fever" -> baseWithVitals(base, vs -> vs.withTemperature(40.0));
            case "Low Blood Pressure" -> baseWithVitals(base, vs -> vs.withSystolicBP(85));
            case "Mild Symptoms" -> baseWithSymptoms(base, List.of("headache"));
            default -> throw new IllegalStateException("No matching generator for rule: " + rule.id());
        };
    }

    private static Patient createBasePatient() {
        return new Patient(
                UUID.randomUUID(), "Test Patient", 40,
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
