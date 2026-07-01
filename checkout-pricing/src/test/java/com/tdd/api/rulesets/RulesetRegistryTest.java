package com.tdd.api.rulesets;

import com.tdd.api.rulesets.data.Ruleset;
import com.tdd.api.rulesets.data.RulesetEntry;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Set;

import static com.tdd.api.rulesets.TestUtils.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RulesetRegistryTest {
    private RulesetRepository repository;
    private RulesetRegistry registry;

    @BeforeEach
    void setup() {
        mockRepoListAndLoad();

        registry = new RulesetRegistry(repository);
    }

    @Test
    void constructor_loadsAllRulesetsIntoCache() {
        Set<RulesetEntry> entries = registry.list();

        assertList(entries);

        verifyListAndLoad();
    }

    @Test
    void get_returnsCachedRuleset() {
        Ruleset rs = registry.get(DEFAULT_UUID);

        assertRuleset(createDefaultRuleset(V_1), rs);
    }

    @Test
    void get_returnsNull_whenNotInCache() {
        assertNull(registry.get(MISSING_UUID));
    }

    @Test
    void save_updatesCache_andDelegatesToRepository() {
        Ruleset newRuleset = NEW_RULESET;

        registry.save(newRuleset);

        verify(repository).save(newRuleset);

        assertRuleset(newRuleset, registry.get(NEW_RULESET_UUID));
    }

    @Test
    void delete_removesFromCacheAndDelegatesToRepository() {
        registry.delete(DEFAULT_UUID);

        verify(repository).delete(DEFAULT_UUID);

        assertCacheDelete();
    }

    @Test
    void listNames_returnsAllCachedNames() {
        Set<RulesetEntry> entries = registry.list();

        assertEquals(EXPECTED_ENTRIES, entries);
    }

    @Test
    void loadAll_populatesCacheFromRepository() {
        registry = new RulesetRegistry(repository);

        assertCache();
    }

    private void mockRepoListAndLoad() {
        repository = mock(RulesetRepository.class);
        when(repository.list()).thenReturn(List.of(DEFAULT_ENTRY, CAMPAIGN_A_ENTRY));

        Ruleset defaultRuleset = createDefaultRuleset(V_1);
        Ruleset campaignA = createRuleset(CAMPAIGN_A_UUID, CAMPAIGN_A_NAME, V_2);

        when(repository.load(DEFAULT_UUID)).thenReturn(defaultRuleset);
        when(repository.load(CAMPAIGN_A_UUID)).thenReturn(campaignA);
    }

    private void verifyListAndLoad() {
        verify(repository).list();
        verify(repository).load(DEFAULT_UUID);
        verify(repository).load(CAMPAIGN_A_UUID);
    }

    private void assertList(Set<RulesetEntry> entries) {
        assertEquals(EXPECTED_ENTRIES, entries);
        assertNotNull(registry.get(DEFAULT_UUID));
        assertNotNull(registry.get(CAMPAIGN_A_UUID));
    }

    private void assertCache() {
        assertEquals(2, registry.list().size());
        assertTrue(registry.list().contains(DEFAULT_ENTRY));
        assertTrue(registry.list().contains(CAMPAIGN_A_ENTRY));
    }

    private void assertCacheDelete() {
        assertEquals(1, registry.list().size());
        assertFalse(registry.list().contains(DEFAULT_ENTRY));
        assertTrue(registry.list().contains(CAMPAIGN_A_ENTRY));
    }
}
