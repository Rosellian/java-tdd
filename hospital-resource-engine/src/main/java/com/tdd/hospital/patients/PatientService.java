package com.tdd.hospital.patients;

import com.tdd.hospital.api.patients.PatientCreateRequest;
import com.tdd.hospital.api.patients.PatientRequest;
import com.tdd.hospital.patients.factory.RandomPatientFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {
    private static final Logger logger = LoggerFactory.getLogger(PatientService.class);

    private final RandomPatientFactory randomFactory;

    public PatientService(RandomPatientFactory randomFactory) {
        this.randomFactory = randomFactory;
    }

    public List<Patient> all() {
        return null;
    }

    public Patient get(String id) {
        return null;
    }

    public Patient add(PatientRequest request) {
        return null;
    }

    //TODO autosave it to some list?
    public Patient create(PatientCreateRequest request) {
        logger.info("Request to create random patient: {}", request);

        Patient patient = randomFactory.create(request);
        logger.info("Created random patient: {}", patient);

        return patient;
    }
}
