package com.tdd.hospital.api.patients;

import com.tdd.hospital.patients.Patient;
import com.tdd.hospital.patients.database.DataList;

import java.util.List;

public record PatientListRequest(
        DataList list,
        List<Patient> patients
) {}
