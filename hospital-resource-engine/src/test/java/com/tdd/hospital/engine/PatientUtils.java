package com.tdd.hospital.engine;

import com.tdd.hospital.patients.Patient;
import com.tdd.hospital.patients.TriageLevel;
import com.tdd.hospital.patients.VitalSigns;

import java.util.List;

public class PatientUtils {
    public static final VitalSigns VITAL_SIGNS_LOW_OXYGEN = new VitalSigns(120, 90, 60,
            80, 37.0);

    public static final Patient PATIENT_1 = createPatient("p1", "Anna", 70, VITAL_SIGNS_LOW_OXYGEN,
            List.of("breathing difficulty"));

    static Patient createPatient(String id, String name, int age, VitalSigns vitalSigns, List<String> symptoms) {
        return new Patient(id, name, age, vitalSigns, symptoms, null);
    }

    public static Patient from(Patient patient, TriageLevel level) {
        return new Patient(patient.id(), patient.name(), patient.age(), patient.vitals(), patient.symptoms(), level);
    }
}
