package com.tdd.hospital.config.triage;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class TriageFlywayConfig {

    @Bean(name = "triageFlyway")
    public Flyway triageFlyway(@Qualifier("triageDataSource") DataSource ds) {
        Flyway flyway = Flyway.configure()
                .dataSource(ds)
                .locations("classpath:db/triage")
                .baselineOnMigrate(true)
                .load();

        flyway.migrate();

        return flyway;
    }
}
