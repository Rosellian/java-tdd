package com.tdd.hospital.engine.triage;

import com.tdd.hospital.tracing.TraceType;

public record ExpectedTrace(
        String expectedLabel,
        String expectedDetail,
        TraceType expectedType
) {}
