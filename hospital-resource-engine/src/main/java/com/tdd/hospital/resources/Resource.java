package com.tdd.hospital.resources;

import java.util.UUID;

public record Resource(
        UUID id,
        ResourceType type,
        int capacity,
        int used
) {}
