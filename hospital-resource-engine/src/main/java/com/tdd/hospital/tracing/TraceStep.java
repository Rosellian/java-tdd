package com.tdd.hospital.tracing;

public record TraceStep(
        String label,
        String detail,
        TraceType type
) {}
