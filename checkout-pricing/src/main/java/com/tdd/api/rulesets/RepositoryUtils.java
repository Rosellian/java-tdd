package com.tdd.api.rulesets;

import org.springframework.jdbc.core.JdbcTemplate;

public class RepositoryUtils {
    public static final String LIST_RULESETS = "SELECT name FROM rulesets ORDER BY name";
    public static final String LOAD_RULESET = "SELECT json FROM rulesets WHERE name = ?";

    private static final String SAVE_RULESET_POSTGRESQL = """
                INSERT INTO rulesets (name, version, json, updated_at, created_at)
                VALUES (?, ?, ?, NOW(), NOW())
                ON CONFLICT (name)
                DO UPDATE SET version = EXCLUDED.version,
                  json = EXCLUDED.json,
                  updated_at = NOW()
            """;
    private static final String SAVE_RULESET_H2 = """
                MERGE INTO rulesets KEY(name)
                VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            """;

    public static String getSaveByDialect(JdbcTemplate jdbc) {
        try {
            String dialect = jdbc.getDataSource().getConnection().getMetaData().getDatabaseProductName();

            if (dialect.contains("PostgreSQL")) {
                return SAVE_RULESET_POSTGRESQL;
            }
            else {
                return SAVE_RULESET_H2;
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to determine sql dialect", e);
        }
    }
}
