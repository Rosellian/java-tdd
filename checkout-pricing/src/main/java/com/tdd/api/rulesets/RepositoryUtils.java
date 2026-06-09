package com.tdd.api.rulesets;

import org.springframework.jdbc.core.JdbcTemplate;

public class RepositoryUtils {
    public static final String LIST_RULESETS = "SELECT name FROM rulesets ORDER BY name";
    public static final String LOAD_RULESET = "SELECT json FROM rulesets WHERE name = ?";
    public static final String DELETE_RULESET = "DELETE FROM rulesets WHERE name = ?";

    private static final String POSTGRESQL = "PostgreSQL";
    private static final String H_2 = "H2";
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

    private RepositoryUtils() {}

    public static String getSaveByDialect(JdbcTemplate jdbc) {
        String dialect = getDialect(jdbc);

        return dialect.equals(POSTGRESQL) ? SAVE_RULESET_POSTGRESQL : SAVE_RULESET_H2;
    }

    private static String getDialect(JdbcTemplate jdbc) {
        try {
            String dialect = jdbc.getDataSource().getConnection().getMetaData().getDatabaseProductName();

            if (dialect.contains(POSTGRESQL)) {
                return POSTGRESQL;
            }
            else {
                return H_2;
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to determine sql dialect", e);
        }
    }
}
