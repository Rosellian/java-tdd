package com.tdd.Impl;

import com.tdd.GildedRose;
import com.tdd.GildedRoseTest;
import com.tdd.Item;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class GildedRoseNewTest extends GildedRoseTest {

    @Override
    protected GildedRose createGildedRose(Item[] items) {
        return new GildedRoseNew(items);
    }

    @Test
    void conjuredItems_degradeTwiceAsFast() {
        Item[] items = { new Item("Conjured Mana Cake", 5, 10) };
        GildedRose app = createGildedRose(items);

        app.updateQuality();

        assertEquals(4, items[0].sellIn);
        assertEquals(8, items[0].quality);
    }

    @Test
    void conjuredItems_degradeFourAfterSellDate() {
        Item[] items = { new Item("Conjured Mana Cake", 0, 10) };
        GildedRose app = createGildedRose(items);

        app.updateQuality();

        assertEquals(-1, items[0].sellIn);
        assertEquals(6, items[0].quality);
    }

    @Test
    void conjuredItems_neverGoBelowZero() {
        Item[] items = { new Item("Conjured Mana Cake", 5, 1) };
        GildedRose app = createGildedRose(items);

        app.updateQuality();

        assertEquals(0, items[0].quality);
    }
}
