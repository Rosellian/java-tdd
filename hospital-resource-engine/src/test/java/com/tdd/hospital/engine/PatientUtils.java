package com.tdd.hospital.engine;

import com.tdd.hospital.patients.Patient;
import com.tdd.hospital.engine.triage.rules.TriageLevel;
import com.tdd.hospital.patients.VitalSigns;

import java.util.List;
import java.util.UUID;

public class PatientUtils {
    public static final VitalSigns VITAL_SIGNS_LOW_OXYGEN = new VitalSigns(120, 90, 60,
            80, 37.0);

    public static final Patient PATIENT_1 = createPatient(UUID.randomUUID(), "Anna", 70,
            VITAL_SIGNS_LOW_OXYGEN, List.of("breathing difficulty"));

    static Patient createPatient(UUID id, String name, int age, VitalSigns vitalSigns, List<String> symptoms) {
        return new Patient(id, name, age, vitalSigns, symptoms, null);
    }

    public static Patient from(Patient patient, TriageLevel level) {
        return new Patient(patient.id(), patient.name(), patient.age(), patient.vitals(), patient.symptoms(), level);
    }
}
