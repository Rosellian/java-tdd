package com.tdd.hospital.api.patients;

import com.tdd.hospital.patients.Patient;
import com.tdd.hospital.patients.PatientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.tdd.hospital.api.patients.PatientCreateRequest.empty;

@RestController
@RequestMapping("/api/patients")
public class PatientController {
    private static final Logger logger = LoggerFactory.getLogger(PatientController.class);

    private final PatientService service;

    public PatientController(PatientService service) {
        this.service = service;
    }

    //TODO Return only entry data for ID?
    @GetMapping
    public List<Patient> all() {
        logger.info("Request for all patients");

        List<Patient> patients = service.all();
        logger.info("Response returned patients: {}", patients);

        return patients;
    }

    @GetMapping("/{id}")
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
    public Patient create(@RequestBody(required = false) PatientCreateRequest request) {
        logger.info("Request to create patient: {}", request);
        PatientCreateRequest createRequest = getRequest(request);

        Patient patient = service.create(createRequest);
        logger.info("New patient returned {}", patient);

        return patient;
    }

    //TODO find better solution or improve error handling?
    private static PatientCreateRequest getRequest(PatientCreateRequest request) {
        PatientCreateRequest createRequest = request;
        if(request == null || request.specs() == null) {
            logger.info("No create request body provided, using defaults");
            createRequest = empty();
        }
        return createRequest;
    }
}
