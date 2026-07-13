package com.tdd.hospital.patients;

import java.util.List;

public record Patient(
        String id,
        String name,
        int age,
        VitalSigns vitals,
        List<String> symptoms,
        TriageLevel triageLevel
) {}
