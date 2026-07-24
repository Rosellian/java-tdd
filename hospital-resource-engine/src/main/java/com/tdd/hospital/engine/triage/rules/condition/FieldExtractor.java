package com.tdd.hospital.engine.triage.rules.condition;

import com.tdd.hospital.patients.Patient;

import java.lang.reflect.Field;

public class FieldExtractor {

    private FieldExtractor() {}

    static Object extractField(Patient patient, String field) {
        return switch (field) {
            case "vitals.oxygenSaturation" -> patient.vitals().oxygenSaturation();
            case "vitals.temperature" -> patient.vitals().temperature();
            case "vitals.systolicBP" -> patient.vitals().systolicBP();
            case "vitals.diastolicBP" -> patient.vitals().diastolicBP();
            case "symptoms" -> patient.symptoms();
            case "age" -> patient.age();
            case "name" -> patient.name();
            default -> throw new IllegalArgumentException("Unknown field: " + field);
        };
    }

    static Object resolveField(Object root, String path) {
        try {
            String[] parts = path.split("\\.");

            Object current = root;

            for (String part : parts) {
                Field f = current.getClass().getDeclaredField(part);
                f.setAccessible(true);
                current = f.get(current);
            }

            return current;

        } catch (Exception e) {
            throw new RuntimeException("Failed to resolve field path: " + path, e);
        }
    }
}
