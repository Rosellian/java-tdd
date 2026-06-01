package com.tdd.api.prices;

import com.tdd.api.prices.data.Price;
import com.tdd.api.prices.data.PriceList;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static com.tdd.api.prices.RepositoryUtils.*;
import static com.tdd.api.prices.TestUtils.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PriceRepositoryTest {
    private JdbcTemplate jdbc;
    private PriceRepository repository;
    private DbMocker dbMocker;

    @BeforeEach
    void setup() {
        jdbc = mock(JdbcTemplate.class);
        repository = new PriceRepository(jdbc);
        dbMocker = new DbMocker(jdbc);
    }

    //load
    @Test
    void load_returnsNull_whenNoPriceListFound() {
        dbMocker.mockLoadList(List.of());

        PriceList result = repository.load(DEFAULT_NAME);

        assertNull(result);
    }

    @Test
    void load_returnsPriceListWithPrices_whenFound() {
        dbMocker.mockDefaultPriceList();
        dbMocker.mockLoadPrices();

        PriceList result = repository.load(DEFAULT_NAME);

        assertDefaultPriceList(result);
    }

    @Test
    void load_throwsRuntimeException_whenJdbcFailsOnPriceList() {
        dbMocker.mockLoadListException();

        RuntimeException ex = assertThrows(RuntimeException.class, () -> repository.load(DEFAULT_NAME));

        assertException("Failed to load price list", ex);
    }

    @Test
    void load_throwsRuntimeException_whenJdbcFailsOnPrices() {
        dbMocker.mockDefaultPriceList();
        dbMocker.mockLoadPricesException();

        RuntimeException ex = assertThrows(RuntimeException.class, () -> repository.load(DEFAULT_NAME));

        assertException("Failed to load price list", ex);
    }

    //save
    @Test
    void save_updatesPriceList_andReplacesPrices() {
        PriceList pl = createDefaultPriceList();

        repository.save(DEFAULT_NAME, pl);

        verifyDefaultPriceList();
    }

    @Test
    void save_throwsRuntimeException_whenJdbcFailsOnPriceList() {
        PriceList pl = createEmptyDefaultPriceList();

        dbMocker.mockSaveListException();

        RuntimeException ex = assertThrows(RuntimeException.class, () -> repository.save(DEFAULT_NAME, pl));

        assertException("Failed to save price list " + DEFAULT_NAME, ex);
    }

    @Test
    void save_throwsRuntimeException_whenJdbcFailsOnDeletePrices() {
        PriceList pl = createEmptyDefaultPriceList();

        dbMocker.mockDeletePricesException();

        RuntimeException ex = assertThrows(RuntimeException.class, () -> repository.save(DEFAULT_NAME, pl));

        assertException("Failed to save price list " + DEFAULT_NAME, ex);
    }

    @Test
    void save_throwsRuntimeException_whenJdbcFailsOnInsertPrice() {
        PriceList pl = createDefaultPriceList(List.of(new Price("A", 50)));

        dbMocker.mockSavePriceException();

        RuntimeException ex = assertThrows(RuntimeException.class, () -> repository.save(DEFAULT_NAME, pl));

        assertException("Failed to save price list " + DEFAULT_NAME, ex);
    }

    //list
    @Test
    void list_returnsAllPriceListNames() {
        dbMocker.mockList();

        List<String> result = repository.list();

        assertPriceListNames(result);
    }

    @Test
    void list_throwsRuntimeException_whenJdbcFails() {
        dbMocker.mockListException();

        RuntimeException ex = assertThrows(RuntimeException.class, () -> repository.list());

        assertException("Failed to load price list names", ex);
    }

    private void verifyDefaultPriceList() {
        verify(jdbc).update(SAVE_PRICE_LIST, DEFAULT_NAME, V_1);
        verify(jdbc).update(DELETE_PRICES_FOR_LIST, DEFAULT_NAME);

        verify(jdbc).update(SAVE_PRICE, DEFAULT_NAME, "A", 50.0);
        verify(jdbc).update(SAVE_PRICE, DEFAULT_NAME, "B", 40.0);
    }
}
