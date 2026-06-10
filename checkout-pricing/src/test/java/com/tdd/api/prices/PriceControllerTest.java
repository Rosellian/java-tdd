package com.tdd.api.prices;

import com.tdd.api.prices.data.PriceList;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Set;

import static com.tdd.api.prices.TestUtils.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PriceControllerTest {
    private PriceRegistry registry;
    private PriceController controller;

    @BeforeEach
    void setup() {
        registry = mock(PriceRegistry.class);
        controller = new PriceController(registry);
    }

    @Test
    void list_returnsAllPriceListNames() {
        mockListNames();

        Set<String> result = controller.list();

        verify(registry).listNames();
        assertEquals(Set.of(DEFAULT_NAME, PRICE_LIST_A_NAME), result);
    }

    @Test
    void load_returnsPriceList_whenExists() {
        PriceList pl = DEFAULT_LIST_1;

        when(registry.get(DEFAULT_NAME)).thenReturn(pl);

        PriceList result = controller.load(DEFAULT_NAME);

        verify(registry).get(DEFAULT_NAME);

        assertPriceList(pl, result);
    }

    @Test
    void load_returnsNull_whenNotFound() {
        mockGetNull();

        PriceList result = controller.load(MISSING);

        verify(registry).get(MISSING);
        assertNull(result);
    }

    @Test
    void save_delegatesToRegistry() {
        PriceList pl = createNewList();

        controller.save(NEW_LIST_NAME, pl);

        verify(registry).save(NEW_LIST_NAME, pl);
    }

    @Test
    void delete_callsRegistryAndReturns204() {
        ResponseEntity<Void> response = controller.delete(PRICE_LIST_A_NAME);

        verify(registry).delete(PRICE_LIST_A_NAME);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    @Test
    void deleteDefault_Returns403Forbidden() {
        ResponseEntity<Void> response = controller.delete(DEFAULT_NAME);

        verifyNoInteractions(registry);

        assertEquals(403, response.getStatusCode().value());
    }

    private void mockListNames() {
        when(registry.listNames()).thenReturn(Set.of(DEFAULT_NAME, PRICE_LIST_A_NAME));
    }

    private void mockGetNull() {
        when(registry.get(MISSING)).thenReturn(null);
    }
}
