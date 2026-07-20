package com.tdd.hospital.engine.triage.rules;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.UUID;

@Configuration
public class TriageConfig {

    @Bean
    public List<TriageRule> defaultRules() {
        return List.of(
                new TriageRule(
                        UUID.randomUUID(),
                        "Critical Oxygen",
                        p -> p.vitals().oxygenSaturation() < 85,
                        TriageLevel.RED
                ),
                new TriageRule(
                        UUID.randomUUID(),
                        "High Fever",
                        p -> p.vitals().temperature() > 39.5,
                        TriageLevel.ORANGE
                ),
                new TriageRule(
                        UUID.randomUUID(),
                        "Low Blood Pressure",
                        p -> p.vitals().systolicBP() < 90,
                        TriageLevel.ORANGE
                ),
                new TriageRule(
                        UUID.randomUUID(),
                        "Mild Symptoms",
                        p -> p.symptoms().contains("headache"),
                        TriageLevel.YELLOW
                )
        );
    }
}