package com.tdd.hospital.config.patients;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.autoconfigure.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class PatientsDataSourceConfig {

    @Bean
    @ConfigurationProperties("spring.datasource-patients")
    public DataSourceProperties patientsDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean(name = "patientsDataSource")
    public DataSource patientsDataSource() {
        return patientsDataSourceProperties()
                .initializeDataSourceBuilder()
                .build();
    }

    @Bean(name = "patientsJdbcTemplate")
    public JdbcTemplate patientsJdbcTemplate(@Qualifier("patientsDataSource") DataSource ds) {
        return new JdbcTemplate(ds);
    }
}
