package com.tdd.hospital.engine.triage.rules;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class TriageConfig {

    @Bean
    public List<TriageRule> defaultRules() {
        return List.of(
                new TriageRule(
                        "r1",
                        "Critical Oxygen",
                        p -> p.vitals().oxygenSaturation() < 85,
                        TriageLevel.RED
                ),
                new TriageRule(
                        "r2",
                        "High Fever",
                        p -> p.vitals().temperature() > 39.5,
                        TriageLevel.ORANGE
                ),
                new TriageRule(
                        "r3",
                        "Low Blood Pressure",
                        p -> p.vitals().systolicBP() < 90,
                        TriageLevel.ORANGE
                ),
                new TriageRule(
                        "r4",
                        "Mild Symptoms",
                        p -> p.symptoms().contains("headache"),
                        TriageLevel.YELLOW
                )
        );
    }
}
