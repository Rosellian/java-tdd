package com.tdd.hospital.api.patients;

import com.tdd.hospital.patients.Patient;
import com.tdd.hospital.patients.PatientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {
    private static final Logger logger = LoggerFactory.getLogger(PatientController.class);

    private final PatientService service;

    public PatientController(PatientService service) {
        this.service = service;
    }

    //TODO Return only entry data for ID?
    public List<Patient> all() {
        logger.info("Request for all patients");

        List<Patient> patients = service.all();
        logger.info("Response returned patients: {}", patients);

        return patients;
    }

    @PostMapping("/{id}")
    public Patient get(@PathVariable String id) {
        logger.info("Request for patient with id: {}", id);

        Patient patient = service.get(id);
        logger.info("Response returned patient: {}", patient);

        return patient;
    }

    @PostMapping
    public void add(@RequestBody PatientRequest request) {
        logger.info("Request to add patient: {}", request);
    }

    @PostMapping("/create")
    public Patient create(@RequestBody PatientCreateRequest request) {
        logger.info("Request to create patient: {}", request);

        Patient patient = service.create(request);
        logger.info("New patient returned {}", patient);

        return patient;
    }
}
