package com.tdd.api.prices;

import com.tdd.api.data.DataRepository;
import com.tdd.api.prices.data.Price;
import com.tdd.api.prices.data.PriceList;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.tdd.api.prices.RepositoryUtils.*;

@Repository
public class PriceRepository implements DataRepository<PriceList> {
    private final JdbcTemplate jdbc;

    public PriceRepository(@Qualifier("pricesJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public PriceList load(String name) {
        try {
            List<PriceList> results = jdbc.query(LOAD_PRICE_LIST, priceListRowMapper, name);

            return results.isEmpty() ? null : addPrices(results.getFirst());
        } catch (Exception e) {
            throw new RuntimeException("Failed to load price list " + name, e);
        }
    }

    private PriceList addPrices(PriceList priceList) {
        String name = priceList.name();

        try {
            List<Price> prices = jdbc.query(LOAD_PRICES, priceRowMapper, name);

            return new PriceList(name, priceList.version(), prices);
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to load prices for list " + name, e);
        }
    }

    @Override
    public void save(String name, PriceList priceList) {
        try {
            jdbc.update(SAVE_PRICE_LIST, name, priceList.version());

            jdbc.update(DELETE_PRICES_FOR_LIST, name);

            priceList.unitPrices().forEach(price ->
                    jdbc.update(SAVE_PRICE, name, price.sku(), price.price())
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to save price list " + name, e);
        }
    }

    @Override
    public void delete(String name) {
        try {
            jdbc.update(DELETE_PRICE_LIST, name);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete price list " + name, e);
        }
    }

    @Override
    public List<String> list() {
        try {
            return jdbc.queryForList(LIST_PRICE_LISTS, String.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to load price list names", e);
        }
    }
}
