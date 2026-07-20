package com.tdd.hospital.config.triage;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.autoconfigure.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class TriageDataSourceConfig {

    @Bean
    @ConfigurationProperties("spring.datasource-triage")
    public DataSourceProperties triageDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean(name = "triageDataSource")
    public DataSource triageDataSource() {
        return triageDataSourceProperties()
                .initializeDataSourceBuilder()
                .build();
    }

    @Bean(name = "triageJdbcTemplate")
    public JdbcTemplate triageJdbcTemplate(@Qualifier("triageDataSource") DataSource ds) {
        return new JdbcTemplate(ds);
    }
}
