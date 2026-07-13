package com.tdd.hospital.resources;

public record Resource(
        String id,
        ResourceType type,
        int capacity,
        int used
) {}
