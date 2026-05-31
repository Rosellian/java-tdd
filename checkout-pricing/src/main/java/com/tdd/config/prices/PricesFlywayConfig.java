package com.tdd.config.prices;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class PricesFlywayConfig {

    @Bean(name = "pricesFlyway")
    public Flyway pricesFlyway(@Qualifier("pricesDataSource") DataSource ds) {
        Flyway flyway = Flyway.configure()
                .dataSource(ds)
                .locations("classpath:db/prices")
                .baselineOnMigrate(true)
                .load();

        flyway.migrate();

        return flyway;
    }
}
