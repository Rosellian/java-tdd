package com.tdd.hospital.engine.triage.rules.condition;

import com.tdd.hospital.engine.triage.rules.database.dto.ConditionDTO;
import com.tdd.hospital.patients.Patient;

public class Compiler {

    private Compiler() {}

    public static Condition compile(ConditionDTO dto) {
        return patient -> {
            Object fieldValue = extractField(patient, dto.field());

            return switch (dto.operator()) {
                case "<"  -> toDouble(fieldValue) <  toDouble(dto.value());
                case ">"  -> toDouble(fieldValue) >  toDouble(dto.value());
                case "<=" -> toDouble(fieldValue) <= toDouble(dto.value());
                case ">=" -> toDouble(fieldValue) >= toDouble(dto.value());
                case "==" -> fieldValue.toString().equals(dto.value());
                case "contains" -> fieldValue.toString().contains(dto.value());
                default -> false;
            };
        };
    }

    private static Object extractField(Patient patient, String field) {
        //TODO Make choice to use either explicit or generic method
        return FieldExtractor.extractField(patient, field);
    }

    private static double toDouble(Object o) {
        return Double.parseDouble(o.toString());
    }
}
