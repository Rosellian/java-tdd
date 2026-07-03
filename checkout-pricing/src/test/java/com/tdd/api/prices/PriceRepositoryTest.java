package com.tdd.api.prices;

import com.tdd.api.prices.data.PriceList;
import com.tdd.api.prices.data.PriceListEntry;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
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

        PriceList result = repository.load(DEFAULT_UUID);

        assertNull(result);
    }

    @Test
    void load_returnsPriceListWithPrices_whenFound() {
        dbMocker.mockDefaultPriceList();
        dbMocker.mockLoadPrices();

        PriceList result = repository.load(DEFAULT_UUID);

        assertPriceList(createDefaultPriceList(), result);
    }

    @Test
    void load_throwsRuntimeException_whenJdbcFailsOnPriceList() {
        dbMocker.mockLoadListException();

        RuntimeException ex = assertThrows(RuntimeException.class, () -> repository.load(DEFAULT_UUID));

        assertException("Failed to load price list", ex);
    }

    @Test
    void load_throwsRuntimeException_whenJdbcFailsOnPrices() {
        dbMocker.mockDefaultPriceList();
        dbMocker.mockLoadPricesException();

        RuntimeException ex = assertThrows(RuntimeException.class, () -> repository.load(DEFAULT_UUID));

        assertException("Failed to load price list", ex);
    }

    //save
    @Test
    void save_updatesPriceList_andReplacesPrices() {
        PriceList pl = createDefaultPriceList();

        repository.save(pl);

        verifyDefaultPriceList();
    }

    @Test
    void save_throwsRuntimeException_whenJdbcFailsOnPriceList() {
        PriceList pl = createEmptyDefaultPriceList();

        dbMocker.mockSaveListException();

        RuntimeException ex = assertThrows(RuntimeException.class, () -> repository.save(pl));

        assertException("Failed to save price list with id " + DEFAULT_UUID, ex);
    }

    @Test
    void save_throwsRuntimeException_whenJdbcFailsOnDeletePrices() {
        PriceList pl = createEmptyDefaultPriceList();

        dbMocker.mockDeletePricesException();

        RuntimeException ex = assertThrows(RuntimeException.class, () -> repository.save(pl));

        assertException("Failed to save price list with id " + DEFAULT_UUID, ex);
    }

    @Test
    void save_throwsRuntimeException_whenJdbcFailsOnInsertPrice() {
        PriceList pl = createDefaultPriceList(List.of(PRICE_A));

        dbMocker.mockSavePriceException();

        RuntimeException ex = assertThrows(RuntimeException.class, () -> repository.save(pl));

        assertException("Failed to save price list with id " + DEFAULT_UUID, ex);
    }

    //delete
    @Test
    void delete_executesCorrectSql() {
        ArgumentCaptor<String> sql = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<Object> arg = ArgumentCaptor.forClass(Object.class);

        repository.delete(DEFAULT_UUID);

        verify(jdbc).update(sql.capture(), arg.capture());

        assertEquals(DELETE_PRICE_LIST, sql.getValue());
        assertEquals(DEFAULT_UUID, arg.getValue());
    }

    //list
    @Test
    void list_returnsAllPriceListNames() {
        dbMocker.mockList();

        List<PriceListEntry> result = repository.list();

        assertPriceListEntries(result);
    }

    @Test
    void list_throwsRuntimeException_whenJdbcFails() {
        dbMocker.mockListException();

        RuntimeException ex = assertThrows(RuntimeException.class, () -> repository.list());

        assertException("Failed to load price list names", ex);
    }

    private void verifyDefaultPriceList() {
        verify(jdbc).update(SAVE_PRICE_LIST, DEFAULT_UUID, DEFAULT_NAME, V_1);
        verify(jdbc).update(DELETE_PRICES_FOR_LIST, DEFAULT_UUID);

        verify(jdbc).update(SAVE_PRICE, PRICE_A.id(), DEFAULT_UUID, "A", 50.0);
        verify(jdbc).update(SAVE_PRICE, PRICE_B.id(), DEFAULT_UUID, "B", 40.0);
    }
}
