package com.tdd.hospital.api.patients;

import com.tdd.hospital.patients.VitalSigns;

import java.util.List;

public record PatientRequest(
        String name,
        int age,
        VitalSigns vitals,
        List<String> symptoms
) {}
