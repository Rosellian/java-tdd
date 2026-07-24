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
                        "Critical Heart Rate",
                        p -> p.vitals().heartRate() <= 15,
                        new ConditionDTO("vitals.heartRate", "<=", "15"),
                        "Heart rate below or equal to 15 BPM",
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
                new TriageRule(UUID.randomUUID(),
                        "High Blood Pressure",
                        p -> p.vitals().diastolicBP() > 110,
                        new ConditionDTO("vitals.diastolicBP", ">", "110"),
                        "Diastolic blood pressure above 110",
                        TriageLevel.ORANGE
                ),
                new TriageRule(
                        UUID.randomUUID(),
                        "Mild Symptoms",
                        p -> p.symptoms().contains("headache"),
                        new ConditionDTO("symptoms", "contains", "headache"),
                        "Symptoms include headache",
                        TriageLevel.YELLOW
                )
        );
    }
}