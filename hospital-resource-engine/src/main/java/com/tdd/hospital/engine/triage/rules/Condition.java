package com.tdd.hospital.engine.triage.rules;

import com.tdd.hospital.patients.Patient;

@FunctionalInterface
public interface Condition {

    boolean matches(Patient patient);
}
