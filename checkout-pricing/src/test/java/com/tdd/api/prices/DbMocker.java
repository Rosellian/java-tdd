package com.tdd.api.prices;

import com.tdd.api.prices.data.Price;
import com.tdd.api.prices.data.PriceList;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static com.tdd.api.prices.RepositoryUtils.*;
import static com.tdd.api.prices.RepositoryUtils.priceRowMapper;
import static com.tdd.api.prices.TestUtils.*;
import static org.mockito.Mockito.when;

public class DbMocker {
    private final JdbcTemplate jdbc;

    public DbMocker(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public void mockDefaultPriceList() {
        PriceList pl = new PriceList(DEFAULT_UUID, DEFAULT_NAME, V_1, List.of());
        mockLoadList(List.of(pl));
    }

    public void mockLoadList(List<PriceList> priceLists) {
        when(jdbc.query(LOAD_PRICE_LIST, priceListRowMapper, DEFAULT_UUID))
                .thenReturn(priceLists);
    }

    public void mockLoadPrices() {
        List<Price> prices = createDefaultPrices();

        when(jdbc.query(LOAD_PRICES, priceRowMapper, DEFAULT_UUID))
                .thenReturn(prices);
    }

    public void mockLoadListException() {
        when(jdbc.query(LOAD_PRICE_LIST, priceListRowMapper, DEFAULT_UUID))
                .thenThrow(new DataAccessException("DB error") {});
    }

    public void mockLoadPricesException() {
        when(jdbc.query(LOAD_PRICES, priceRowMapper, DEFAULT_UUID))
                .thenThrow(new DataAccessException("DB error") {});
    }

    public void mockSaveListException() {
        when(jdbc.update(SAVE_PRICE_LIST, DEFAULT_UUID, DEFAULT_NAME, V_1))
                .thenThrow(new DataAccessException("DB error") {});
    }

    public void mockDeletePricesException() {
        when(jdbc.update(DELETE_PRICES_FOR_LIST, DEFAULT_UUID))
                .thenThrow(new DataAccessException("DB error") {});
    }

    public void mockSavePriceException() {
        when(jdbc.update(SAVE_PRICE, DEFAULT_UUID, "A", 50.0))
                .thenThrow(new DataAccessException("DB error") {});
    }

    public void mockList() {
        when(jdbc.query(LIST_PRICE_LISTS, priceListEntryRowMapper))
                .thenReturn(List.of(DEFAULT_ENTRY, PRICE_LIST_A_ENTRY));
    }

    public void mockListException() {
        when(jdbc.query(LIST_PRICE_LISTS, priceListEntryRowMapper))
                .thenThrow(new DataAccessException("DB error") {});
    }
}
