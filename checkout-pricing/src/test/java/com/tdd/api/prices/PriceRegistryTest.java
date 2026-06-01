package com.tdd.api.prices;

import com.tdd.api.prices.data.Price;
import com.tdd.api.prices.data.PriceList;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Set;

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
        Set<String> names = registry.listNames();

        assertList(names);

        verifyListAndLoad();
    }

    @Test
    void get_returnsCachedPriceList() {
        PriceList pl = registry.get(DEFAULT_NAME);

        assertNotNull(pl);
        assertEquals(DEFAULT_NAME, pl.name());
        assertEquals(V_1, pl.version());
    }

    @Test
    void get_returnsNull_whenNotInCache() {
        assertNull(registry.get(MISSING));
    }

    @Test
    void save_updatesCache_andDelegatesToRepository() {
        PriceList newList = createDefaultPriceList(NEW_LIST_NAME,"v3", List.of(new Price("X", 99)));

        registry.save(NEW_LIST_NAME, newList);

        verify(repository).save(NEW_LIST_NAME, newList);

        assertEquals(newList, registry.get(NEW_LIST_NAME));
    }

    @Test
    void listNames_returnsAllCachedNames() {
        Set<String> names = registry.listNames();

        assertEquals(Set.of(DEFAULT_NAME, PRICE_LIST_A_NAME), names);
    }

    @Test
    void loadAll_populatesCacheFromRepository() {
        registry = new PriceRegistry(repository);

        registry.loadAll();

        assertLoadAll();
    }

    private void mockRepoListAndLoad() {
        when(repository.list()).thenReturn(List.of(DEFAULT_NAME, PRICE_LIST_A_NAME));

        PriceList defaultList = createDefaultPriceList(DEFAULT_NAME, V_1,List.of(new Price("A", 50)));
        PriceList listA = createDefaultPriceList(PRICE_LIST_A_NAME, V_2, List.of(new Price("B", 40)));

        when(repository.load(DEFAULT_NAME)).thenReturn(defaultList);
        when(repository.load(PRICE_LIST_A_NAME)).thenReturn(listA);
    }

    private void verifyListAndLoad() {
        verify(repository).list();
        verify(repository).load(DEFAULT_NAME);
        verify(repository).load(PRICE_LIST_A_NAME);
    }

    private void assertList(Set<String> names) {
        assertEquals(Set.of(DEFAULT_NAME, PRICE_LIST_A_NAME), names);
        assertNotNull(registry.get(DEFAULT_NAME));
        assertNotNull(registry.get(PRICE_LIST_A_NAME));
    }

    private void assertLoadAll() {
        assertEquals(2, registry.listNames().size());
        assertTrue(registry.listNames().contains(DEFAULT_NAME));
        assertTrue(registry.listNames().contains(PRICE_LIST_A_NAME));
    }
}
