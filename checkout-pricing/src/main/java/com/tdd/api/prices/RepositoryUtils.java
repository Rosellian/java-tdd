package com.tdd.api.prices;

import com.tdd.api.prices.data.Price;
import com.tdd.api.prices.data.PriceList;
import org.springframework.jdbc.core.RowMapper;

import java.util.List;

public class RepositoryUtils {
    public static final String LIST_PRICE_LISTS = """
                SELECT name FROM price_lists ORDER BY name
            """;
    public static final String LOAD_PRICE_LIST = """
                SELECT name, version
                FROM price_lists
                WHERE name = ?
            """;
    public static final String LOAD_PRICES = """
                SELECT sku, price
                FROM prices
                WHERE list_name = ?
                ORDER BY sku
            """;
    static RowMapper<PriceList> priceListRowMapper = (rs, rowNum) -> new PriceList(
            rs.getString("name"),
            rs.getString("version"),
            List.of()
    );
    static RowMapper<Price> priceRowMapper = (rs, rowNum) -> new Price(
            rs.getString("sku"),
            rs.getDouble("price")
    );

    public static final String SAVE_PRICE_LIST = """
                INSERT INTO price_lists (name, version, created_at, updated_at)
                VALUES (?, ?, NOW(), NOW())
                ON CONFLICT (name)
                DO UPDATE SET version = EXCLUDED.version,
                              updated_at = NOW()
            """;
    public static final String DELETE_PRICES_FOR_LIST = "DELETE FROM prices WHERE list_name = ?";
    public static final String SAVE_PRICE = """
                INSERT INTO prices (list_name, sku, price)
                VALUES (?, ?, ?)
            """;

    public static final String DELETE_PRICE_LIST = "DELETE FROM price_lists WHERE name = ?";

    private RepositoryUtils() {}
}
