package com.tdd.hospital.patients;

import com.tdd.hospital.engine.triage.rules.TriageLevel;

import java.util.List;

public record Patient(
        String id,
        String name,
        int age,
        VitalSigns vitals,
        List<String> symptoms,
        TriageLevel triageLevel
) {}
