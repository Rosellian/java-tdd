package com.tdd.hospital.engine.triage.rules;

import com.tdd.hospital.engine.triage.rules.database.dto.ConditionDTO;
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
                        new ConditionDTO("vitals.oxygenSaturation", "<", "85"),
                        "Oxygen saturation below 85%",
                        TriageLevel.RED
                ),
                new TriageRule(
                        UUID.randomUUID(),
                        "High Fever",
                        p -> p.vitals().temperature() > 39.5,
                        new ConditionDTO("vitals.temperature", ">", "39.5"),
                        "Body temperature above 39.5",
                        TriageLevel.ORANGE
                ),
                new TriageRule(
                        UUID.randomUUID(),
                        "Low Blood Pressure",
                        p -> p.vitals().systolicBP() < 90,
                        new ConditionDTO("vitals.systolicBP", "<", "90"),
                        "Systolic blood pressure below 90",
                        TriageLevel.ORANGE
                ),
                new TriageRule(
                        UUID.randomUUID(),
                        "Mild Symptoms",
                        p -> p.symptoms().contains("headache"),
                        new ConditionDTO("symptoms", "contains", "90"),
                        "Symptoms include headache",
                        TriageLevel.YELLOW
                )
        );
    }
}