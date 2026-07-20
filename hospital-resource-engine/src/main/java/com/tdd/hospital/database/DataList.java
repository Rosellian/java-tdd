package com.tdd.hospital.database;

import java.util.UUID;

public record DataList(
        UUID id,
        String name,
        String version
) {}
