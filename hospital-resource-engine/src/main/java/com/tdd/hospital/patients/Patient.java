package com.tdd.hospital.patients;

import com.tdd.hospital.engine.triage.rules.TriageLevel;

import java.util.List;
import java.util.UUID;

public record Patient(
        UUID id,
        String name,
        int age,
        VitalSigns vitals,
        List<String> symptoms,
        TriageLevel triageLevel
) {}
