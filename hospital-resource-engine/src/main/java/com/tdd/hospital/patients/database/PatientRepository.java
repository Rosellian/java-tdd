package com.tdd.hospital.patients.database;

import com.tdd.hospital.database.DataEntry;
import com.tdd.hospital.database.DataList;
import com.tdd.hospital.database.DirectRepository;
import com.tdd.hospital.patients.Patient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

import static com.tdd.hospital.patients.database.RepositoryUtils.*;

@Repository
public class PatientRepository implements DirectRepository<Patient> {
    private static final Logger logger = LoggerFactory.getLogger(PatientRepository.class);

    private final JdbcTemplate jdbcTemplate;

    public PatientRepository(@Qualifier("patientsJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbcTemplate = jdbc;
    }

    //TODO refactor to reuse more code

    @Override
    public List<DataList> getLists() {
        try {
            logger.info("Loading patient lists");

            List<DataList> lists = jdbcTemplate.query(GET_PATIENT_LISTS, listRowMapper);
            logger.info("Loaded patient lists {}", lists);

            return lists;
        }  catch (Exception e) {
            logger.error("Failed to load patient lists", e);
            return null;
        }
    }

    @Override
    public List<Patient> getList(UUID listId) {
        try {
            logger.info("Loading patient list by id: {}", listId);
            List<String> patientData = jdbcTemplate.queryForList(GET_PATIENTS, String.class, listId);

            List<Patient> patients = readPatientData(patientData);
            logger.info("Loaded patient list: {}", patients);

            return patients;
        }  catch (Exception e) {
            logger.error("Failed to load patient list", e);
            return null;
        }
    }

    @Override
    public void saveList(DataList list, List<Patient> patients) {
        try {
            logger.info("Saving patient list: {}", list);
            jdbcTemplate.update(SAVE_PATIENT_LIST, list.id(), list.name(), list.version());

            logger.info("Deleting patients in list {}", list);
            jdbcTemplate.update(DELETE_PATIENTS_IN_LIST, list.id());

            savePatients(list, patients);

            logger.info("Saved patient list {} {}", list, patients);
        }  catch (Exception e) {
            logger.error("Failed to save patient lists", e);
        }
    }

    private void savePatients(DataList list, List<Patient> patients) {
        logger.info("Saving patients in list {} {}", list, patients);

        patients.stream()
                .map(patient -> toEntry(patient, list.id()))
                .forEach(this::savePatient);
    }

    private void savePatient(DataEntry patient) {
        logger.info("Saving patient data as json {}", patient);

        jdbcTemplate.update(SAVE_PATIENT, patient.id(), patient.listId(), patient.data());
    }
}