package com.tdd.api.rulesets;

import org.mockito.ArgumentCaptor;
import org.springframework.dao.DataAccessException;

import java.util.List;

import static com.tdd.api.rulesets.TestUtils.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class RepoTestUtils {
    private static final String VERSION_IN_JSON = "\"version\"";
    public static final String POSTGRES_SQL_16 = "PostgreSQL 16";
    public static final String H_2 = "H2";
    public static final String BAD_JSON = "bad";

    private RepoTestUtils() {}

    public static void assertSave(ArgumentCaptor<String> sqlCaptor, ArgumentCaptor<Object> argCaptor,
                                  String databaseType) {
        String sql = sqlCaptor.getValue();
        List<Object> args = argCaptor.getAllValues();
        String dbUpdateSignature = databaseType.equals(H_2) ? "merge" : "on conflict";

        assertTrue(sql.toLowerCase().contains(dbUpdateSignature));
        assertEquals(DEFAULT_UUID, args.get(0));
        assertEquals(DEFAULT_NAME, args.get(1));
        assertEquals(V_2, args.get(2));
        assertTrue(args.get(3).toString().contains(VERSION_IN_JSON));
    }

    public static DataAccessException createDbError() {
        return new DataAccessException("DB error") {
        };
    }
}
