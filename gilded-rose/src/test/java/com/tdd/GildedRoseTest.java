package com.tdd;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class GildedRoseTest {

    protected GildedRose createGildedRose(Item[] items) {
        return new GildedRose(items);
    }

    @Test
    void normalItem_degradesQualityAndSellInByOne() {
        Item[] items = { new Item("foo", 10, 20) };
        GildedRose app = createGildedRose(items);

        app.updateQuality();

        assertEquals(9, items[0].sellIn);
        assertEquals(19, items[0].quality);
    }

    @Test
    void quality_neverGoesBelowZero() {
        Item[] items = { new Item("foo", 5, 0) };
        GildedRose app = createGildedRose(items);

        app.updateQuality();

        assertEquals(0, items[0].quality);
    }

    @Test
    void agedBrie_qualityNeverExceedsFifty() {
        Item[] items = { new Item("Aged Brie", 5, 50) };
        GildedRose app = createGildedRose(items);

        app.updateQuality();

        assertEquals(50, items[0].quality);
    }

    @Test
    void agedBrie_qualityIncreasesTwiceAsFastWhenSellInIsBelowZero() {
        Item[] items = { new Item("Aged Brie", 0, 10) };
        GildedRose app = createGildedRose(items);

        app.updateQuality();

        assertEquals(12, items[0].quality);
    }

    @Test
    void backstagePasses_increaseByOneWhenMoreThanTenDaysLeft() {
        Item[] items = { new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20) };
        GildedRose app = createGildedRose(items);

        app.updateQuality();

        assertEquals(14, items[0].sellIn);
        assertEquals(21, items[0].quality);
    }

    @Test
    void backstagePasses_increaseByTwoWhenTenDaysOrLessLeft() {
        Item[] items = { new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20) };
        GildedRose app = createGildedRose(items);

        app.updateQuality();

        assertEquals(9, items[0].sellIn);
        assertEquals(22, items[0].quality);
    }

    @Test
    void backstagePasses_increaseByThreeWhenFiveDaysOrLessLeft() {
        Item[] items = { new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20) };
        GildedRose app = createGildedRose(items);

        app.updateQuality();

        assertEquals(4, items[0].sellIn);
        assertEquals(23, items[0].quality);
    }

    @Test
    void backstagePasses_qualityNeverExceedsFifty() {
        Item[] items = { new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50) };
        GildedRose app = createGildedRose(items);

        app.updateQuality();

        assertEquals(50, items[0].quality);
    }

    @Test
    void backstagePasses_qualityDropsToZeroAfterConcert() {
        Item[] items = { new Item("Backstage passes to a TAFKAL80ETC concert", 0, 30) };
        GildedRose app = createGildedRose(items);

        app.updateQuality();

        assertEquals(-1, items[0].sellIn);
        assertEquals(0, items[0].quality);
    }

    @Test
    void sulfuras_neverChanges() {
        Item[] items = { new Item("Sulfuras, Hand of Ragnaros", 5, 80) };
        GildedRose app = createGildedRose(items);

        app.updateQuality();

        assertEquals(5, items[0].sellIn);
        assertEquals(80, items[0].quality);
    }
}
