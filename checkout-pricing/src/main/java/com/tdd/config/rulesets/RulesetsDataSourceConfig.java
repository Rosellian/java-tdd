package com.tdd.config.rulesets;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.autoconfigure.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class RulesetsDataSourceConfig {

    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource")
    public DataSourceProperties rulesetsDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean(name = "rulesetsDataSource")
    @Primary
    public DataSource rulesetsDataSource() {
        return rulesetsDataSourceProperties()
                .initializeDataSourceBuilder()
                .build();
    }

    @Bean(name = "rulesetsJdbcTemplate")
    @Primary
    public JdbcTemplate rulesetsJdbcTemplate(@Qualifier("rulesetsDataSource") DataSource ds) {
        return new JdbcTemplate(ds);
    }
}
