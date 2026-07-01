package com.tdd.api.rulesets;

import com.tdd.api.rulesets.data.Ruleset;
import com.tdd.api.rulesets.data.RulesetEntry;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Set;

import static com.tdd.api.rulesets.TestUtils.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RulesetControllerTest {

    private RulesetRegistry registry;
    private RulesetController controller;

    @BeforeEach
    void setup() {
        registry = mock(RulesetRegistry.class);
        controller = new RulesetController(registry);
    }

    @Test
    void list_returnsAllRulesetNames() {
        mockListNames();

        Set<RulesetEntry> result = controller.list();

        verify(registry).list();
        assertEquals(EXPECTED_ENTRIES, result);
    }

    @Test
    void load_returnsRuleset_whenExists() {
        Ruleset rs = createDefaultRuleset(V_1);

        when(registry.get(DEFAULT_UUID)).thenReturn(rs);

        Ruleset result = controller.load(DEFAULT_UUID);

        verify(registry).get(DEFAULT_UUID);
        assertRuleset(rs, result);
    }

    @Test
    void load_returnsNull_whenNotFound() {
        mockGetNull();

        Ruleset result = controller.load(MISSING_UUID);

        verify(registry).get(MISSING_UUID);
        assertNull(result);
    }

    @Test
    void save_delegatesToRegistry() {
        Ruleset rs = NEW_RULESET;

        controller.save(NEW_RULESET_UUID, rs);

        verify(registry).save(rs);
    }

    //TODO Should this really be allowed?
    @Test
    void save_allowsNullRulesetBody() {
        controller.save(MISSING_UUID, null);

        verify(registry).save(null);
    }

    @Test
    void delete_callsRegistryAndReturns204() {
        when(registry.get(NEW_RULESET_UUID)).thenReturn(NEW_RULESET);

        ResponseEntity<Void> response = controller.delete(NEW_RULESET_UUID);

        verify(registry).delete(NEW_RULESET_UUID);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    @Test
    void deleteDefault_Returns403Forbidden() {
        when(registry.get(DEFAULT_UUID)).thenReturn(createDefaultRuleset(V_1));

        ResponseEntity<Void> response = controller.delete(DEFAULT_UUID);

        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
    }

    private void mockListNames() {
        when(registry.list()).thenReturn(EXPECTED_ENTRIES);
    }

    private void mockGetNull() {
        when(registry.get(MISSING_UUID)).thenReturn(null);
    }
}
