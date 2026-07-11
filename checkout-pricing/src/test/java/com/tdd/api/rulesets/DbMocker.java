package com.tdd.api.rulesets;

import com.tdd.api.rulesets.data.Ruleset;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import tools.jackson.databind.ObjectMapper;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.SQLException;
import java.util.List;

import static com.tdd.api.rulesets.RepoTestUtils.*;
import static com.tdd.api.rulesets.RepoTestUtils.createDbError;
import static com.tdd.api.rulesets.RepositoryUtils.*;
import static com.tdd.api.rulesets.TestUtils.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class DbMocker {
    private final JdbcTemplate jdbc;
    private final ObjectMapper mapper = new ObjectMapper();

    public DbMocker(JdbcTemplate jdbc) {this.jdbc = jdbc;}

    public void mockList() {
        when(jdbc.query(LIST_RULESETS, rulesetRowMapper))
                .thenReturn(List.of(DEFAULT_ENTRY, CAMPAIGN_A_ENTRY));
    }

    public void mockListDataAccessException() {
        when(jdbc.query(LIST_RULESETS, rulesetRowMapper))
                .thenThrow(createDbError());
    }

    public void mockLoad(Ruleset ruleset) {
        String json = mapper.writeValueAsString(ruleset);
        when(jdbc.queryForObject(LOAD_RULESET, String.class, DEFAULT_UUID))
                .thenReturn(json);
    }

    public void mockLoadBadJson() {
        when(jdbc.queryForObject(LOAD_RULESET, String.class, BAD_JSON))
                .thenReturn("not-json");
    }

    public void mockLoadDataAccessException(DataAccessException e) {
        when(jdbc.queryForObject(LOAD_RULESET, String.class, MISSING_UUID))
                .thenThrow(e);
    }

    public void mockSaveDataAccessException() {
        when(jdbc.update(anyString(), any(), any(), any()))
                .thenThrow(createDbError());
    }

    public void mockDatabaseType(String type) throws SQLException {
        DataSource dataSource = mock(DataSource.class);
        Connection connection = mock(Connection.class);
        DatabaseMetaData metaData = mock(DatabaseMetaData.class);

        when(jdbc.getDataSource()).thenReturn(dataSource);
        when(dataSource.getConnection()).thenReturn(connection);
        when(connection.getMetaData()).thenReturn(metaData);
        when(metaData.getDatabaseProductName()).thenReturn(type);
    }
}
