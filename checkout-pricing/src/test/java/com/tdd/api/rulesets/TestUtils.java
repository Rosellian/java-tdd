package com.tdd.api.rulesets;

import com.tdd.api.rulesets.data.Ruleset;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestUtils {
    public static final String V_1 = "v1";
    public static final String V_2 = "v2";
    public static final String DEFAULT_NAME = "default";
    public static final String CAMPAIGN_A_NAME = "campaignA";
    public static final String MISSING = "missing";
    public static final String NEW_RULESET_NAME = "newRuleset";
    public static final Ruleset NEW_RULESET = createRuleset(NEW_RULESET_NAME, "99");

    private TestUtils() {}

    public static Ruleset createDefaultRuleset(String version) {
        return createRuleset(DEFAULT_NAME, version);
    }
    public static Ruleset createRuleset(String name, String version) {
        Ruleset ruleset = new Ruleset();
        ruleset.setName(name);
        ruleset.setVersion(version);

        return ruleset;
    }

    public static void assertRuleset(Ruleset expected, Ruleset actual) {
        assertNotNull(actual);
        assertEquals(expected.getName(), actual.getName());
        assertEquals(expected.getVersion(), actual.getVersion());
    }

    public static void assertException(String expectedMessage, RuntimeException ex) {
        assertTrue(ex.getMessage().contains(expectedMessage));
    }
}
