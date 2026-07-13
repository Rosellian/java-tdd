package com.tdd.hospital.patients;

public record VitalSigns(
        int hearRate,
        int systolicBP,
        int diastolicBP,
        int oxygenSaturation,
        double temperature
) {}
