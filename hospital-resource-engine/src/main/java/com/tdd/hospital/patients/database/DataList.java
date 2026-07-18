package com.tdd.hospital.patients.database;

import java.util.UUID;

public record DataList(
        UUID id,
        String name,
        String version
) {}
