package com.tdd.api.prices;

import com.tdd.api.data.DataRepository;
import com.tdd.api.prices.data.Price;
import com.tdd.api.prices.data.PriceList;
import org.springframework.beans.factory.annotation.Qualifier;
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
        //TODO add exception handling
        List<PriceList> results = jdbc.query(LOAD_PRICE_LIST, priceListRowMapper, name);

        return results.isEmpty() ? null : addPrices(results.getFirst());
    }

    private PriceList addPrices(PriceList priceList) {
        String name = priceList.name();

        List<Price> prices = jdbc.query(LOAD_PRICES, priceRowMapper, name);

        return new PriceList(name, priceList.version(), prices);
    }

    @Override
    public void save(String name, PriceList priceList) {
        //TODO add exception handling
        jdbc.update(SAVE_PRICE_LIST, name, priceList.version());

        jdbc.update(DELETE_PRICES_FOR_LIST, name);

        priceList.unitPrices().forEach(price ->
                jdbc.update(SAVE_PRICE, name, price.sku(), price.price())
        );
    }

    @Override
    public List<String> list() {
        //TODO add exception handling
        return jdbc.queryForList(LIST_PRICE_LISTS, String.class);
    }
}
