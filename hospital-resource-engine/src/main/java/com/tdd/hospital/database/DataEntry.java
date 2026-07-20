package com.tdd.hospital.database;

import java.util.UUID;

public record DataEntry(
        UUID id,
        UUID listId,
        String data
) {}
