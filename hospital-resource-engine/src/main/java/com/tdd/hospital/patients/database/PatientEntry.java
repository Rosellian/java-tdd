package com.tdd.hospital.patients.database;

import java.util.UUID;

public record PatientEntry(
        UUID id,
        UUID listId,
        String data
) {}
