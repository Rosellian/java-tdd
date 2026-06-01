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
    public static final PriceList DEFAULT_LIST_1 = createDefaultPriceList(List.of(new Price("A", 50)));

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
    public static PriceList createNewList() {
        return createPriceList(NEW_LIST_NAME, "v3", List.of(new Price("X", 99)));
    }
    public static PriceList createPriceList(String name, String version, List<Price> prices) {
        return new PriceList(name, version, prices);
    }

    public static void assertPriceList(PriceList expected, PriceList result) {
        assertNotNull(result);
        assertEquals(expected.name(), result.name());
        assertEquals(expected.version(), result.version());
        assertEquals(expected.unitPrices().size(), result.unitPrices().size());
        //TODO assert prices too
    }

    public static void assertException(String expectedMessage, RuntimeException ex) {
        assertTrue(ex.getMessage().contains(expectedMessage));
    }

    public static void assertPriceListNames(List<String> result) {
        assertEquals(2, result.size());
        assertEquals(DEFAULT_NAME, result.getFirst());
    }
}
