package com.tdd.hospital.api.allocation;

import com.tdd.hospital.patients.Patient;
import com.tdd.hospital.resources.Resource;

import java.util.List;

public record AllocationRequest(
        Patient patient,
        List<Resource> resources
) {}
