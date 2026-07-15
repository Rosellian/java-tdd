package com.tdd.hospital.engine.api.triage;

import org.junit.jupiter.api.Test;

import static org.springframework.http.RequestEntity.post;
import static org.springframework.http.ResponseEntity.status;

public class TriageControllerTest {

    @Test
    void triageReturnsRedForCriticalPatient() throws Exception {
        mockMvc.perform(post("/api/triage/p1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.level").value("RED"))
                .andExpect(jsonPath("$.trace[0].type").value("RULE_MATCH"));
    }
}
