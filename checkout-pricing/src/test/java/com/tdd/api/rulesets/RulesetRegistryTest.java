package com.tdd.api.rulesets;

import com.tdd.api.rulesets.data.Ruleset;
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
        Set<String> names = registry.listNames();

        assertList(names);

        verifyListAndLoad();
    }

    @Test
    void get_returnsCachedRuleset() {
        Ruleset rs = registry.get(DEFAULT_NAME);

        assertRuleset(createDefaultRuleset(V_1), rs);
    }

    @Test
    void get_returnsNull_whenNotInCache() {
        assertNull(registry.get(MISSING));
    }

    @Test
    void save_updatesCache_andDelegatesToRepository() {
        Ruleset newRuleset = createRuleset(NEW_RULESET_NAME, "99");

        registry.save(NEW_RULESET_NAME, newRuleset);

        verify(repository).save(NEW_RULESET_NAME, newRuleset);

        assertEquals(newRuleset, registry.get(NEW_RULESET_NAME));
    }

    @Test
    void listNames_returnsAllCachedNames() {
        Set<String> names = registry.listNames();

        assertEquals(Set.of(DEFAULT_NAME, CAMPAIGN_A_NAME), names);
    }

    @Test
    void loadAll_populatesCacheFromRepository() {
        registry = new RulesetRegistry(repository);

        assertCache();
    }

    private void mockRepoListAndLoad() {
        repository = mock(RulesetRepository.class);
        when(repository.list()).thenReturn(List.of(DEFAULT_NAME, CAMPAIGN_A_NAME));

        Ruleset defaultRuleset = createDefaultRuleset(V_1);
        Ruleset campaignA = createRuleset(CAMPAIGN_A_NAME, V_2);

        when(repository.load(DEFAULT_NAME)).thenReturn(defaultRuleset);
        when(repository.load(CAMPAIGN_A_NAME)).thenReturn(campaignA);
    }

    private void verifyListAndLoad() {
        verify(repository).list();
        verify(repository).load(DEFAULT_NAME);
        verify(repository).load(CAMPAIGN_A_NAME);
    }

    private void assertList(Set<String> names) {
        assertEquals(Set.of(DEFAULT_NAME, CAMPAIGN_A_NAME), names);
        assertNotNull(registry.get(DEFAULT_NAME));
        assertNotNull(registry.get(CAMPAIGN_A_NAME));
    }

    private void assertCache() {
        assertEquals(2, registry.listNames().size());
        assertTrue(registry.listNames().contains(DEFAULT_NAME));
        assertTrue(registry.listNames().contains(CAMPAIGN_A_NAME));
    }
}
