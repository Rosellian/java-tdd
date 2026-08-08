package com.tdd.hospital.patients;

import com.tdd.hospital.api.patients.PatientCreateRequest;
import com.tdd.hospital.database.DataList;
import com.tdd.hospital.patients.database.PatientRepository;
import com.tdd.hospital.patients.factory.RandomPatientFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PatientService {
    private static final Logger logger = LoggerFactory.getLogger(PatientService.class);

    private final PatientRepository repository;
    private final RandomPatientFactory randomFactory;

    public PatientService(PatientRepository repository, RandomPatientFactory randomFactory) {
        this.repository = repository;
        this.randomFactory = randomFactory;
    }

    //TODO refactor to reuse more code

    public List<DataList> getLists() {
        logger.info("Getting patient lists");

        List<DataList> lists = repository.getLists();
        logger.info("Retrieved patient lists: {}", lists);

        return lists;
    }

    public List<Patient> getList(UUID id) {
        logger.info("Getting patient list with id: {}", id);

        List<Patient> patients = repository.getList(id);
        logger.info("Retrieved patients {}", patients);

        return patients;
    }

    public void save(DataList list, List<Patient> patients) {
        logger.info("Saving patient list {} {}", list, patients);

        repository.saveList(list, patients);
        logger.info("Saved patient list");
    }

    //TODO autosave it to some list?
    public Patient create(PatientCreateRequest request) {
        logger.info("Create random patient according to: {}", request);

        Patient patient = randomFactory.create(request);
        logger.info("Created random patient: {}", patient);

        return patient;
    }

    public List<Patient> getPatients() {
        logger.info("Getting all patients");

        List<Patient> patients = repository.getAllPatients();
        logger.info("Retrieved patients {}", patients);

        return patients;
    }

    public void save(Patient patient, UUID listId) {
        logger.info("Saving patient {} (listId: {})", patient, listId);

        repository.save(patient, listId);
        logger.info("Saved patient");
    }

    public void delete(UUID id) {
        logger.info("Deleting patient with id: {}", id);

        repository.delete(id);
        logger.info("Deleted patient");
    }
}
