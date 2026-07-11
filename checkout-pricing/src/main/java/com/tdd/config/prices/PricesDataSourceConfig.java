package com.tdd.config.prices;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.autoconfigure.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class PricesDataSourceConfig {

    @Bean
    @ConfigurationProperties("spring.datasource-prices")
    public DataSourceProperties pricesDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean(name = "pricesDataSource")
    public DataSource pricesDataSource() {
        return pricesDataSourceProperties()
                .initializeDataSourceBuilder()
                .build();
    }

    @Bean(name = "pricesJdbcTemplate")
    public JdbcTemplate pricesJdbcTemplate(@Qualifier("pricesDataSource") DataSource ds) {
        return new JdbcTemplate(ds);
    }
}
