package com.tdd.api.prices;

import com.tdd.api.prices.data.PriceList;
import com.tdd.api.prices.data.PriceListEntry;
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
        mockListEntries();

        Set<PriceListEntry> result = controller.list();

        verify(registry).list();
        assertEquals(EXPECTED_ENTRIES, result);
    }

    @Test
    void load_returnsPriceList_whenExists() {
        PriceList pl = DEFAULT_LIST_1;

        when(registry.get(DEFAULT_UUID)).thenReturn(pl);

        PriceList result = controller.load(DEFAULT_UUID);

        verify(registry).get(DEFAULT_UUID);

        assertPriceList(pl, result);
    }

    @Test
    void load_returnsNull_whenNotFound() {
        mockGetNull();

        PriceList result = controller.load(MISSING_UUID);

        verify(registry).get(MISSING_UUID);
        assertNull(result);
    }

    @Test
    void save_delegatesToRegistry() {
        PriceList pl = createNewList();

        controller.save(NEW_LIST_UUID, pl);

        verify(registry).save(pl);
    }

    @Test
    void delete_callsRegistryAndReturns204() {
        PriceList priceList = createPriceList(PRICE_LIST_A_UUID, PRICE_LIST_A_NAME, V_2, createDefaultPrices());
        when(registry.get(PRICE_LIST_A_UUID)).thenReturn(priceList);

        ResponseEntity<Void> response = controller.delete(PRICE_LIST_A_UUID);

        verify(registry).delete(PRICE_LIST_A_UUID);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
    }

    @Test
    void deleteDefault_Returns403Forbidden() {
        when(registry.get(DEFAULT_UUID)).thenReturn(DEFAULT_LIST_1);

        ResponseEntity<Void> response = controller.delete(DEFAULT_UUID);

        assertEquals(403, response.getStatusCode().value());
    }

    private void mockListEntries() {
        when(registry.list()).thenReturn(EXPECTED_ENTRIES);
    }

    private void mockGetNull() {
        when(registry.get(MISSING_UUID)).thenReturn(null);
    }
}
