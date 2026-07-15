package com.tdd.hospital.api.patients;

public record PatientCreateRequest(
        Specs specs
) {

    public static PatientCreateRequest empty() {
        Specs specs = new Specs(0);

        return new PatientCreateRequest(specs);
    }
}