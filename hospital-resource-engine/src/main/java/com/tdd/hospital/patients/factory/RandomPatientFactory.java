package com.tdd.hospital.patients.factory;

import com.tdd.hospital.api.patients.PatientCreateRequest;
import com.tdd.hospital.patients.Patient;
import com.tdd.hospital.patients.VitalSigns;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Random;
import java.util.UUID;

@Component
public class RandomPatientFactory {
    private static final List<String> NAMES = List.of(
            "Anna", "Erik", "Maria", "Johan", "Sara", "Oskar", "Elin"
    );
    private static final List<String> SYMPTOMS = List.of(
            "breathing difficulty",
            "chest pain",
            "fever",
            "dizziness",
            "nausea",
            "headache"
    );

    private final Random random = new Random();
    private final VitalsFactory vitalsFactory = new VitalsFactory(random);

    public Patient create(PatientCreateRequest request) {
        String id = getRandomId();
        String name = getRandomName();
        int age = getRandomAge();
        VitalSigns vitals = vitalsFactory.createVitals(request.specs());
        List<String> symptoms = randomSymptoms();

        return new Patient(id, name, age, vitals, symptoms, null);
    }

    private String getRandomId() {
        return UUID.randomUUID().toString();
    }

    private String getRandomName() {
        return NAMES.get(random.nextInt(NAMES.size()));
    }

    private int getRandomAge() {
        return random.nextInt(90) + 1;
    }

    private List<String> randomSymptoms() {
        //TODO add more than one
        String symptom = SYMPTOMS.get(random.nextInt(SYMPTOMS.size()));

        return List.of(symptom);
    }
}
