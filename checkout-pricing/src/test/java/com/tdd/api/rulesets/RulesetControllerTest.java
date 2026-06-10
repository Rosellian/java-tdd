package com.tdd.api.rulesets;

import com.tdd.api.rulesets.data.Ruleset;
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

        Set<String> result = controller.list();

        verify(registry).listNames();
        assertEquals(Set.of(DEFAULT_NAME, CAMPAIGN_A_NAME), result);
    }

    @Test
    void load_returnsRuleset_whenExists() {
        Ruleset rs = createDefaultRuleset(V_1);

        when(registry.get(DEFAULT_NAME)).thenReturn(rs);

        Ruleset result = controller.load(DEFAULT_NAME);

        verify(registry).get(DEFAULT_NAME);
        assertRuleset(rs, result);
    }

    @Test
    void load_returnsNull_whenNotFound() {
        mockGetNull();

        Ruleset result = controller.load(MISSING);

        verify(registry).get(MISSING);
        assertNull(result);
    }

    @Test
    void save_delegatesToRegistry() {
        Ruleset rs = NEW_RULESET;

        controller.save(NEW_RULESET_NAME, rs);

        verify(registry).save(NEW_RULESET_NAME, rs);
    }

    @Test
    void save_allowsNullRulesetBody() {
        controller.save(MISSING, null);

        verify(registry).save(MISSING, null);
    }

    @Test
    void delete_callsRegistryAndReturns204() {
        ResponseEntity<Void> response = controller.delete(NEW_RULESET_NAME);

        verify(registry).delete(NEW_RULESET_NAME);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    @Test
    void deleteDefault_Returns403Forbidden() {
        ResponseEntity<Void> response = controller.delete(DEFAULT_NAME);

        verifyNoInteractions(registry);
        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
    }

    private void mockListNames() {
        when(registry.listNames()).thenReturn(Set.of(DEFAULT_NAME, CAMPAIGN_A_NAME));
    }

    private void mockGetNull() {
        when(registry.get(MISSING)).thenReturn(null);
    }
}
