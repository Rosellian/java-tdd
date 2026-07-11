package com.tdd.api.rulesets;

import com.tdd.api.rulesets.data.Ruleset;
import com.tdd.api.rulesets.data.RulesetEntry;

import java.util.List;
import java.util.Set;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestUtils {
    public static final String V_1 = "v1";
    public static final String V_2 = "v2";

    public static final String DEFAULT_NAME = "default";
    public static final UUID DEFAULT_UUID = UUID.randomUUID();

    public static final String CAMPAIGN_A_NAME = "campaignA";
    public static final UUID CAMPAIGN_A_UUID = UUID.randomUUID();

    public static final UUID MISSING_UUID = UUID.randomUUID();

    public static final String NEW_RULESET_NAME = "newRuleset";
    public static final UUID NEW_RULESET_UUID = UUID.randomUUID();
    public static final Ruleset NEW_RULESET = createRuleset(NEW_RULESET_UUID, NEW_RULESET_NAME, "99");

    public static final RulesetEntry DEFAULT_ENTRY = new RulesetEntry(DEFAULT_UUID, DEFAULT_NAME, V_1);
    public static final RulesetEntry CAMPAIGN_A_ENTRY = new RulesetEntry(CAMPAIGN_A_UUID, CAMPAIGN_A_NAME, V_2);
    public static final Set<RulesetEntry> EXPECTED_ENTRIES = Set.of(
            DEFAULT_ENTRY,
            CAMPAIGN_A_ENTRY
    );

    private TestUtils() {}

    public static Ruleset createDefaultRuleset(String version) {
        return createRuleset(DEFAULT_UUID, DEFAULT_NAME, version);
    }
    public static Ruleset createRuleset(UUID id, String name, String version) {
        return new Ruleset(id, name, version, List.of());
    }

    public static void assertRuleset(Ruleset expected, Ruleset actual) {
        assertNotNull(actual);
        assertEquals(expected.id(), actual.id());
        assertEquals(expected.name(), actual.name());
        assertEquals(expected.version(), actual.version());
    }

    public static void assertException(String expectedMessage, RuntimeException ex) {
        assertTrue(ex.getMessage().contains(expectedMessage));
    }
}
