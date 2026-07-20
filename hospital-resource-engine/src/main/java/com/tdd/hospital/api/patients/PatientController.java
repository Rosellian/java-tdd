package com.tdd.hospital.api.patients;

import com.tdd.hospital.patients.Patient;
import com.tdd.hospital.patients.PatientService;
import com.tdd.hospital.database.DataList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static com.tdd.hospital.api.patients.PatientCreateRequest.empty;

@RestController
@RequestMapping("/api/patients")
public class PatientController {
    private static final Logger logger = LoggerFactory.getLogger(PatientController.class);

    private final PatientService service;

    public PatientController(PatientService service) {
        this.service = service;
    }

    @GetMapping
    public List<DataList> getLists() {
        logger.info("Request for all patient lists");

        List<DataList> lists = service.getLists();
        logger.info("Response returned patient lists: {}", lists);

        return lists;
    }

    @GetMapping("/{listId}")
    public List<Patient> getList(@PathVariable UUID listId) {
        logger.info("Request for patient list with id: {}", listId);

        List<Patient> patients = service.getList(listId);
        logger.info("Response patient list: {}", patients);

        return patients;
    }

    @PostMapping
    public void save(@RequestBody PatientListRequest request) {
        logger.info("Request to save patient list");

        service.save(request.list(), request.patients());
    }

    @PostMapping("/create")
    public Patient create(@RequestBody(required = false) PatientCreateRequest request) {
        logger.info("Request to create patient: {}", request);
        PatientCreateRequest createRequest = normalizeRequest(request);

        Patient patient = service.create(createRequest);
        logger.info("Response new patient {}", patient);

        return patient;
    }

    //TODO find better solution or improve error handling?
    private static PatientCreateRequest normalizeRequest(PatientCreateRequest request) {
        PatientCreateRequest createRequest = request;

        if(request == null || request.specs() == null) {
            logger.info("No create request body provided, using defaults");
            createRequest = empty();
        }

        return createRequest;
    }
}
