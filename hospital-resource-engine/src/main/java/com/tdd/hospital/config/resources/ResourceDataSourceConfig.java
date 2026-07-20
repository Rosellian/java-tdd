package com.tdd.hospital.config.resources;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.autoconfigure.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class ResourceDataSourceConfig {

    @Bean
    @ConfigurationProperties("spring.datasource-resources")
    public DataSourceProperties resourcesDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean(name = "resourcesDataSource")
    public DataSource resourcesDataSource() {
        return resourcesDataSourceProperties()
                .initializeDataSourceBuilder()
                .build();
    }

    @Bean(name = "resourcesJdbcTemplate")
    public JdbcTemplate resourcesJdbcTemplate(@Qualifier("resourcesDataSource") DataSource ds) {
        return new JdbcTemplate(ds);
    }
}
