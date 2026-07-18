package com.tdd.hospital.config.patients;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class PatientsFlywayConfig {

    @Bean(name = "patientsFlyway")
    public Flyway patientsFlyway(@Qualifier("patientsDataSource") DataSource ds) {
        Flyway flyway = Flyway.configure()
                .dataSource(ds)
                .locations("classpath:db")
                .baselineOnMigrate(true)
                .load();

        flyway.migrate();

        return flyway;
    }
}
