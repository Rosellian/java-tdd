package com.tdd.hospital.api.triage;

import com.tdd.hospital.engine.triage.TriageEngine;
import com.tdd.hospital.engine.triage.TriageResult;
import com.tdd.hospital.patients.Patient;
import com.tdd.hospital.patients.PatientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/triage")
public class TriageController {
    private static final Logger logger = LoggerFactory.getLogger(TriageController.class);

    private final TriageEngine engine;
    private final PatientService patients;

    public TriageController(TriageEngine engine, PatientService patients) {
        this.engine = engine;
        this.patients = patients;
    }

    @PostMapping("/{id}")
    public TriageResult triage(@PathVariable String id) {
        logger.info("Request to run triage for patient ID: {}", id);

        Patient patient = patients.get(id);
        logger.info("Running triage for patient: {}", patient);

        return run(patient);
    }

    @PostMapping
    public TriageResult triage(@RequestBody Patient patient) {
        logger.info("Request to run triage for patient: {}", patient);

        return run(patient);
    }

    private TriageResult run(Patient patient) {
        TriageResult result = engine.evaluate(patient);
        logger.info("Triage result: {}", result);

        return result;
    }
}
