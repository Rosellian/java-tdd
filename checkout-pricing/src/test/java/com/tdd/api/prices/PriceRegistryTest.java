package com.tdd.api.prices;

import com.tdd.api.prices.data.Price;
import com.tdd.api.prices.data.PriceList;
import com.tdd.api.prices.data.PriceListEntry;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Set;
import java.util.UUID;

import static com.tdd.api.prices.TestUtils.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PriceRegistryTest {
    private PriceRepository repository;
    private PriceRegistry registry;

    @BeforeEach
    void setup() {
        repository = mock(PriceRepository.class);

        mockRepoListAndLoad();

        registry = new PriceRegistry(repository);
        registry.init();
    }

    @Test
    void init_loadsAllPriceListsIntoCache() {
        Set<PriceListEntry> entries = registry.list();

        assertList(entries);

        verifyListAndLoad();
    }

    @Test
    void get_returnsCachedPriceList() {
        PriceList pl = registry.get(DEFAULT_UUID);

        assertPriceList(DEFAULT_LIST_1, pl);
    }

    @Test
    void get_returnsNull_whenNotInCache() {
        assertNull(registry.get(MISSING_UUID));
    }

    @Test
    void save_updatesCache_andDelegatesToRepository() {
        PriceList newList = createNewList();

        registry.save(newList);

        verify(repository).save(newList);

        assertEquals(newList, registry.get(NEW_LIST_UUID));
    }

    @Test
    void delete_removesFromCacheAndDelegatesToRepository() {
        registry.delete(DEFAULT_UUID);

        verify(repository).delete(DEFAULT_UUID);

        assertCacheDelete();
    }

    @Test
    void listNames_returnsAllCachedNames() {
        Set<PriceListEntry> entries = registry.list();

        assertEquals(EXPECTED_ENTRIES, entries);
    }

    @Test
    void loadAll_populatesCacheFromRepository() {
        registry = new PriceRegistry(repository);

        registry.loadAll();

        assertLoadAll();
    }

    private void mockRepoListAndLoad() {
        when(repository.list()).thenReturn(List.of(DEFAULT_ENTRY, PRICE_LIST_A_ENTRY));

        PriceList listA = createPriceList(PRICE_LIST_A_UUID, PRICE_LIST_A_NAME, V_2,
                List.of(new Price(UUID.randomUUID(),"B", 40)));

        when(repository.load(DEFAULT_UUID)).thenReturn(DEFAULT_LIST_1);
        when(repository.load(PRICE_LIST_A_UUID)).thenReturn(listA);
    }

    private void verifyListAndLoad() {
        verify(repository).list();
        verify(repository).load(DEFAULT_UUID);
        verify(repository).load(PRICE_LIST_A_UUID);
    }

    private void assertList(Set<PriceListEntry> entries) {
        assertEquals(EXPECTED_ENTRIES, entries);
        assertNotNull(registry.get(DEFAULT_UUID));
        assertNotNull(registry.get(PRICE_LIST_A_UUID));
    }

    private void assertLoadAll() {
        assertEquals(2, registry.list().size());
        assertTrue(registry.list().contains(DEFAULT_ENTRY));
        assertTrue(registry.list().contains(PRICE_LIST_A_ENTRY));
    }

    private void assertCacheDelete() {
        assertEquals(1, registry.list().size());
        assertFalse(registry.list().contains(DEFAULT_ENTRY));
        assertTrue(registry.list().contains(PRICE_LIST_A_ENTRY));
    }
}
