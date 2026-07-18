package com.tdd.hospital.patients.database;

import com.tdd.hospital.patients.Patient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.UUID;

@Repository
public class PatientRepository implements DataRepository<Patient> {
    private static final Logger logger = LoggerFactory.getLogger(PatientRepository.class);

    private final JdbcTemplate jdbcTemplate;
    private final ObjectMapper mapper = new ObjectMapper();

    public PatientRepository(@Qualifier("patientsJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbcTemplate = jdbc;
    }

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

    public static final String GET_PATIENT_LISTS = "SELECT id, name, version FROM patient_lists ORDER BY name";
    public static final RowMapper<DataList> listRowMapper = (rs, rowNum) -> new DataList(
            UUID.fromString(rs.getString("id")),
            rs.getString("name"),
            rs.getString("version")
    );

    public static final String GET_PATIENTS = "SELECT data FROM patients WHERE list_id = ?";
    private List<Patient> readPatientData(List<String> patientData) {
        return patientData.stream()
                .map(data -> mapper.readValue(data, Patient.class))
                .toList();
    }

    public static final String SAVE_PATIENT_LIST = """
                INSERT INTO patient_lists (id, name, version, created_at, updated_at)
                VALUES (?, ?, ?, NOW(), NOW())
                ON CONFLICT (id)
                DO UPDATE SET version = EXCLUDED.version,
                              updated_at = NOW()
            """;
    public static final String DELETE_PATIENTS_IN_LIST = "DELETE FROM patients WHERE list_id = ?";
    public static final String SAVE_PATIENT = """
                INSERT INTO patients (id, list_id, data)
                VALUES (?, ?, ?)
            """;
    private void savePatients(DataList list, List<Patient> patients) {
        logger.info("Saving patients in list {} {}", list, patients);
        patients.stream()
                .map(patient -> toEntry(patient, list.id()))
                .forEach(this::savePatient);
    }

    private PatientEntry toEntry(Patient patient, UUID listId) {
        String json = mapper.writerWithDefaultPrettyPrinter()
                .writeValueAsString(patient);

        return new PatientEntry(patient.id(), listId, json);
    }

    private void savePatient(PatientEntry patient) {
        logger.info("Saving patient data as json {}", patient);
        jdbcTemplate.update(SAVE_PATIENT, patient.id(), patient.listId(), patient.data());
    }
}