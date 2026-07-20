package com.tdd.hospital.patients.database;

import com.tdd.hospital.database.DataEntry;
import com.tdd.hospital.patients.Patient;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.UUID;

import static com.tdd.hospital.database.DataRepository.*;

public class RepositoryUtils {
    private static final String lIST_TABLE_NAME = "patient_lists";
    private static final String DATA_TABLE_NAME = "patients";

    public static final String GET_PATIENT_LISTS = getListsQuery(lIST_TABLE_NAME);
    public static final String GET_PATIENTS = getDataItemsQuery(DATA_TABLE_NAME);
    public static final String SAVE_PATIENT_LIST = saveListQuery(lIST_TABLE_NAME);
    public static final String DELETE_PATIENTS_IN_LIST = deleteDataItemsQuery(DATA_TABLE_NAME);
    public static final String SAVE_PATIENT = saveDataItemQuery(DATA_TABLE_NAME);

    private static final ObjectMapper mapper = new ObjectMapper();

    private RepositoryUtils() {}

    static List<Patient> readPatientData(List<String> patientData) {
        return patientData.stream()
                .map(data -> mapper.readValue(data, Patient.class))
                .toList();
    }

    static DataEntry toEntry(Patient patient, UUID listId) {
        String json = mapper.writerWithDefaultPrettyPrinter()
                .writeValueAsString(patient);

        return new DataEntry(patient.id(), listId, json);
    }
}
