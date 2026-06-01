package com.tdd.api.prices;

import com.tdd.api.prices.data.Price;
import com.tdd.api.prices.data.PriceList;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class TestUtils {
    public static final String V_1 = "v1";
    public static final String V_2 = "v2";
    public static final String DEFAULT_NAME = "Default";
    public static final String PRICE_LIST_A_NAME = "PriceListA";
    public static final String NEW_LIST_NAME = "NewList";
    public static final String MISSING = "Missing";

    public static PriceList createEmptyDefaultPriceList() {
        return new PriceList(DEFAULT_NAME, V_1, List.of());
    }

    public static List<Price> createDefaultPrices() {
        return List.of(
                new Price("A", 50),
                new Price("B", 40)
        );
    }

    public static PriceList createDefaultPriceList(List<Price> prices) {
        return new PriceList(DEFAULT_NAME, V_1, prices);
    }
    public static PriceList createDefaultPriceList() {
        return new PriceList(DEFAULT_NAME, V_1, createDefaultPrices());
    }
    public static PriceList createDefaultPriceList(String name, String version, List<Price> prices) {
        return new PriceList(name, version, prices);
    }

    public static void assertDefaultPriceList(PriceList result) {
        assertNotNull(result);
        assertEquals(DEFAULT_NAME, result.name());
        assertEquals(V_1, result.version());
        assertEquals(2, result.unitPrices().size());
    }

    public static void assertException(String expectedMessage, RuntimeException ex) {
        assertTrue(ex.getMessage().contains(expectedMessage));
    }

    public static void assertPriceListNames(List<String> result) {
        assertEquals(2, result.size());
        assertEquals(DEFAULT_NAME, result.getFirst());
    }
}
