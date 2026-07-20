package com.tdd.hospital.config.patients;

import com.tdd.hospital.patients.Patient;
import com.tdd.hospital.database.DataList;
import com.tdd.hospital.patients.database.PatientRepository;
import com.tdd.hospital.patients.factory.RandomPatientFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.IntStream;

@Component
public class PatientsDataLoader {
    private static final Logger logger = LoggerFactory.getLogger(PatientsDataLoader.class);

    private final PatientRepository repository;
    private final RandomPatientFactory factory;

    public PatientsDataLoader(PatientRepository repository, RandomPatientFactory factory) {
        this.repository = repository;
        this.factory = factory;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void run() {
        String name = "Default";

        //TODO Make more robust, maybe add more standard lists
        List<DataList> lists = repository.getLists();

        if(lists != null && !lists.isEmpty()) {
            logger.info("Patient list '{}' already exists. Skipping import.", lists.getFirst());
            return;
        }

        logger.info("Creating default patient list: {}", name);
        DataList list = new DataList(UUID.randomUUID(), name, "v1");
        List<Patient> patients = generatePatients();
        logger.info("Created default patient list with {} random patients", patients);

        repository.saveList(list, patients);
    }

    private List<Patient> generatePatients() {
        return IntStream.range(0, 5)
                .mapToObj(i -> factory.create())
                .toList();
    }
}
