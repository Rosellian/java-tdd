package com.tdd.api.rulesets;

import com.tdd.api.rulesets.data.Ruleset;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.SQLException;
import java.util.List;

import static com.tdd.api.rulesets.RepoTestUtils.*;
import static com.tdd.api.rulesets.TestUtils.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RulesetRepositoryTest {
    private JdbcTemplate jdbc;
    private RulesetRepository repository;
    private DbMocker dbMocker;

    @BeforeEach
    void setup() {
        jdbc = mock(JdbcTemplate.class);
        repository = new RulesetRepository(jdbc);
        dbMocker = new DbMocker(jdbc);
    }

    //load
    @Test
    void load_returnsRuleset_whenJsonExists() {
        Ruleset ruleset = createDefaultRuleset(V_1);
        dbMocker.mockLoad(ruleset);

        Ruleset result = repository.load(DEFAULT_NAME);

        assertRuleset(ruleset, result);
    }

    @Test
    void load_returnsNull_whenNoRowFound() {
        dbMocker.mockLoadDataAccessException(new EmptyResultDataAccessException(1));

        Ruleset result = repository.load(MISSING);

        assertNull(result);
    }

    @Test
    void load_throwsRuntimeException_whenJsonIsInvalid() {
        dbMocker.mockLoadBadJson();

        RuntimeException ex = assertThrows(RuntimeException.class, () -> repository.load(BAD_JSON));

        assertException("Failed to load ruleset", ex);
    }

    @Test
    void load_throwsRuntimeException_whenJdbcFails() {
        dbMocker.mockLoadDataAccessException(createDbError());

        RuntimeException ex = assertThrows(RuntimeException.class, () -> repository.load(MISSING));

        assertException("Failed to load ruleset " + MISSING, ex);
    }

    //save
    @Test
    void save_serializesRuleset_andExecutesUpdate() throws SQLException {
        Ruleset ruleset = createDefaultRuleset(V_2);
        dbMocker.mockDatabaseType(H_2);

        ArgumentCaptor<String> sqlCaptor = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<Object> argCaptor = ArgumentCaptor.forClass(Object.class);

        repository.save(DEFAULT_NAME, ruleset);

        verify(jdbc).update(sqlCaptor.capture(), argCaptor.capture(), argCaptor.capture(), argCaptor.capture());

        assertSave(sqlCaptor, argCaptor, H_2);
    }

    @Test
    void save_serializesRuleset_andExecutesUpdate_postgresql() throws SQLException {
        Ruleset ruleset = createDefaultRuleset(V_2);
        dbMocker.mockDatabaseType(POSTGRES_SQL_16);

        ArgumentCaptor<String> sqlCaptor = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<Object> argCaptor = ArgumentCaptor.forClass(Object.class);

        repository.save(DEFAULT_NAME, ruleset);

        verify(jdbc).update(sqlCaptor.capture(), argCaptor.capture(), argCaptor.capture(), argCaptor.capture());

        assertSave(sqlCaptor, argCaptor, POSTGRES_SQL_16);
    }

    @Test
    void save_throwsRuntimeException_whenJsonSerializationFails() {
        Ruleset ruleset = createDefaultRuleset(V_1);
        simulateJsonError();

        RuntimeException ex = assertThrows(RuntimeException.class, () -> repository.save(DEFAULT_NAME, ruleset));

        assertException("Failed to save ruleset " + ruleset.getName(), ex);
    }

    @Test
    void save_throwsRuntimeException_whenJdbcFails() {
        Ruleset ruleset = createDefaultRuleset(V_1);
        dbMocker.mockSaveDataAccessException();

        RuntimeException ex = assertThrows(RuntimeException.class, () -> repository.save(DEFAULT_NAME, ruleset));

        assertException("Failed to save ruleset " + ruleset.getName(), ex);
    }

    //list
    @Test
    void list_returnsNames() {
        dbMocker.mockList();

        List<String> result = repository.list();

        assertEquals(2, result.size());
        assertEquals(DEFAULT_NAME, result.getFirst());
    }

    @Test
    void list_throwsRuntimeException_whenJdbcFails() {
        dbMocker.mockListDataAccessException();

        RuntimeException ex = assertThrows(RuntimeException.class, () -> repository.list());

        assertTrue(ex.getMessage().contains("Failed to load ruleset list names"));
    }

    private void simulateJsonError() {
        RulesetRepository repo = spy(repository);

        doThrow(new RuntimeException("JSON error"))
                .when(repo)
                .save(eq(DEFAULT_NAME), any());
    }
}
