package com.tdd.api.rulesets;

import com.tdd.api.rulesets.data.RulesetEntry;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.util.UUID;

public class RepositoryUtils {
    public static final String LIST_RULESETS = "SELECT id, name, version FROM rulesets ORDER BY name";

    public static final String LOAD_RULESET = "SELECT json FROM rulesets WHERE id = ?";
    public static final String LOAD_RULESET_ENTRY_BY_NAME = """
            SELECT id, name, version
            FROM rulesets
            WHERE LOWER(name) = LOWER(?)
            """;

    public static final RowMapper<RulesetEntry> rulesetRowMapper = (rs, rowNum) -> new RulesetEntry(
            UUID.fromString(rs.getString("id")),
            rs.getString("name"),
            rs.getString("version")
    );

    public static final String DELETE_RULESET = "DELETE FROM rulesets WHERE id = ?";

    private static final String POSTGRESQL = "PostgreSQL";
    private static final String H_2 = "H2";
    private static final String SAVE_RULESET_POSTGRESQL = """
                INSERT INTO rulesets (id, name, version, json, updated_at, created_at)
                VALUES (?, ?, ?, ?, NOW(), NOW())
                ON CONFLICT (id)
                DO UPDATE SET version =
                  name = EXCLUDED.name,
                  EXCLUDED.version,
                  json = EXCLUDED.json,
                  updated_at = NOW()
            """;
    private static final String SAVE_RULESET_H2 = """
                MERGE INTO rulesets KEY(id)
                VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
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
