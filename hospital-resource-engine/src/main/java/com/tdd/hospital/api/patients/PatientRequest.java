package com.tdd.hospital.api.patients;

import com.tdd.hospital.patients.Patient;

import java.util.UUID;

public record PatientRequest(
        Patient data,
        UUID listId
) {}
