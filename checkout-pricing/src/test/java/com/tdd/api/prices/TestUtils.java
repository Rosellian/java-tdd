package com.tdd.api.prices;

import com.tdd.api.prices.data.Price;
import com.tdd.api.prices.data.PriceList;
import com.tdd.api.prices.data.PriceListEntry;

import java.util.List;
import java.util.Set;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

public class TestUtils {
    public static final String V_1 = "v1";
    public static final String V_2 = "v2";

    public static final String DEFAULT_NAME = "Default";
    public static final UUID DEFAULT_UUID = UUID.randomUUID();

    public static final String PRICE_LIST_A_NAME = "PriceListA";
    public static final UUID PRICE_LIST_A_UUID = UUID.randomUUID();

    public static final String NEW_LIST_NAME = "NewList";
    public static final UUID NEW_LIST_UUID = UUID.randomUUID();

    public static final UUID MISSING_UUID = UUID.randomUUID();

    public static final Price PRICE_A = new Price(UUID.randomUUID(),"A", 50);
    public static final Price PRICE_B = new Price(UUID.randomUUID(),"B", 40);

    public static final PriceList DEFAULT_LIST_1 = createDefaultPriceList(List.of(PRICE_A));

    public static final PriceListEntry DEFAULT_ENTRY = new PriceListEntry(DEFAULT_UUID, DEFAULT_NAME, V_1);
    public static final PriceListEntry PRICE_LIST_A_ENTRY = new
            PriceListEntry(PRICE_LIST_A_UUID, PRICE_LIST_A_NAME, V_2);
    public static final Set<PriceListEntry> EXPECTED_ENTRIES = Set.of(DEFAULT_ENTRY, PRICE_LIST_A_ENTRY);

    private TestUtils() {}

    public static PriceList createEmptyDefaultPriceList() {
        return new PriceList(DEFAULT_UUID, DEFAULT_NAME, V_1, List.of());
    }

    public static List<Price> createDefaultPrices() {
        return List.of(PRICE_A, PRICE_B);
    }

    public static PriceList createDefaultPriceList(List<Price> prices) {
        return new PriceList(DEFAULT_UUID, DEFAULT_NAME, V_1, prices);
    }
    public static PriceList createDefaultPriceList() {
        return new PriceList(DEFAULT_UUID, DEFAULT_NAME, V_1, createDefaultPrices());
    }
    public static PriceList createNewList() {
        return createPriceList(NEW_LIST_UUID, NEW_LIST_NAME, "v3",
                List.of(new Price(UUID.randomUUID(),"X", 99))
        );
    }
    public static PriceList createPriceList(UUID uuid, String name, String version, List<Price> prices) {
        return new PriceList(uuid, name, version, prices);
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

    public static void assertPriceListEntries(List<PriceListEntry> result) {
        assertEquals(2, result.size());
        assertEquals(DEFAULT_ENTRY, result.getFirst());
    }
}
