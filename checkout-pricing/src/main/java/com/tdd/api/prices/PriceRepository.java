package com.tdd.api.prices;

import com.tdd.api.data.DataRepository;
import com.tdd.api.prices.data.Price;
import com.tdd.api.prices.data.PriceList;
import com.tdd.api.prices.data.PriceListEntry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

import static com.tdd.api.prices.RepositoryUtils.*;

@Repository
public class PriceRepository implements DataRepository<PriceList, PriceListEntry> {
    private static final Logger logger = LoggerFactory.getLogger(PriceRepository.class);
    private final JdbcTemplate jdbc;

    public PriceRepository(@Qualifier("pricesJdbcTemplate") JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public PriceList load(UUID id) {
        try {
            List<PriceList> results = jdbc.query(LOAD_PRICE_LIST, priceListRowMapper, id);

            return results.isEmpty() ? null : addPrices(results.getFirst());
        } catch (Exception e) {
            throw new RuntimeException("Failed to load price list with id " + id, e);
        }
    }

    @Override
    public PriceListEntry loadEntryByName(String name) {
        try {
            PriceListEntry entry = jdbc.queryForObject(LOAD_PRICE_LIST_ENTRY_BY_NAME, priceListEntryRowMapper, name);
            logger.debug("Loaded price list entry {}", entry);

            return entry;
        } catch (EmptyResultDataAccessException e) {
            logger.debug("price list {} not found", name);
            return null;
        } catch (Exception e) {
            throw new RuntimeException("Failed to load price list " + name, e);
        }
    }

    private PriceList addPrices(PriceList priceList) {
        UUID id = priceList.id();

        try {
            List<Price> prices = jdbc.query(LOAD_PRICES, priceRowMapper, id);
            logger.debug("Loaded prices {}", prices);

            return new PriceList(id, priceList.name(), priceList.version(), prices);
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to load prices for list " + id, e);
        }
    }

    @Override
    public void save(PriceList priceList) {
        UUID id = priceList.id();
        try {
            logger.debug("Saving price list {}", priceList);
            jdbc.update(SAVE_PRICE_LIST, id, priceList.name(), priceList.version());

            logger.debug("Deleting prices for {}", priceList);
            jdbc.update(DELETE_PRICES_FOR_LIST, id);

            logger.debug("Saving prices for {}", priceList);
            priceList.unitPrices().forEach(price ->
                    jdbc.update(SAVE_PRICE, id, price.sku(), price.price())
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to save price list with id " + id, e);
        }
    }

    @Override
    public void delete(UUID id) {
        try {
            logger.info("Deleting price list with id {}", id);
            jdbc.update(DELETE_PRICE_LIST, id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete price list with id " + id, e);
        }
    }

    @Override
    public List<PriceListEntry> list() {
        try {
            List<PriceListEntry> entries = jdbc.query(LIST_PRICE_LISTS, priceListEntryRowMapper);
            logger.debug("Loaded list of price list entries {}", entries);

            return entries;
        } catch (Exception e) {
            throw new RuntimeException("Failed to load price list names", e);
        }
    }
}
