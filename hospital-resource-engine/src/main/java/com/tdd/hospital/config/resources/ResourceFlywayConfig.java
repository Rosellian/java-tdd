package com.tdd.hospital.config.resources;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class ResourceFlywayConfig {

    @Bean(name = "resourcesFlyway")
    public Flyway resourcesFlyway(@Qualifier("resourcesDataSource") DataSource ds) {
        Flyway flyway = Flyway.configure()
                .dataSource(ds)
                .locations("classpath:db/resources")
                .baselineOnMigrate(true)
                .load();

        flyway.migrate();

        return flyway;
    }
}
