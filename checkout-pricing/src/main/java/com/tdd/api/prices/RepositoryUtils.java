package com.tdd.api.prices;

import com.tdd.api.prices.data.Price;
import com.tdd.api.prices.data.PriceList;
import com.tdd.api.prices.data.PriceListEntry;
import org.springframework.jdbc.core.RowMapper;

import java.util.List;
import java.util.UUID;

public class RepositoryUtils {
    public static final String LIST_PRICE_LISTS = """
                SELECT id, name, version
                FROM price_lists
                ORDER BY name
            """;

    public static final String LOAD_PRICE_LIST = """
                SELECT id, name, version
                FROM price_lists
                WHERE id = ?
            """;
    public static final String LOAD_PRICE_LIST_ENTRY_BY_NAME = """
                SELECT id, name, version
                FROM price_lists
                WHERE LOWER(name) = LOWER(?)
            """;
    public static final String LOAD_PRICES = """
                SELECT sku, price
                FROM prices
                WHERE list_id = ?
                ORDER BY sku
            """;

    static RowMapper<PriceListEntry> priceListEntryRowMapper = (rs, rowNum) -> new PriceListEntry(
            UUID.fromString(rs.getString("id")),
            rs.getString("name"),
            rs.getString("version")
    );
    static RowMapper<PriceList> priceListRowMapper = (rs, rowNum) -> new PriceList(
            UUID.fromString(rs.getString("id")),
            rs.getString("name"),
            rs.getString("version"),
            List.of()
    );
    static RowMapper<Price> priceRowMapper = (rs, rowNum) -> new Price(
            rs.getString("sku"),
            rs.getDouble("price")
    );

    public static final String SAVE_PRICE_LIST = """
                INSERT INTO price_lists (id, name, version, created_at, updated_at)
                VALUES (?, ?, ?, NOW(), NOW())
                ON CONFLICT (id)
                DO UPDATE SET version = EXCLUDED.version,
                              updated_at = NOW()
            """;
    public static final String DELETE_PRICES_FOR_LIST = "DELETE FROM prices WHERE list_id = ?";
    public static final String SAVE_PRICE = """
                INSERT INTO prices (list_id, sku, price)
                VALUES (?, ?, ?)
            """;

    public static final String DELETE_PRICE_LIST = "DELETE FROM price_lists WHERE id = ?";

    private RepositoryUtils() {}
}
