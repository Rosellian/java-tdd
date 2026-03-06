package com.tdd.Impl;

import com.tdd.GildedRose;
import com.tdd.Item;

public class GildedRoseNew extends GildedRose {

    public GildedRoseNew(Item[] items) {
        super(items);
    }

    @Override
    public void updateQuality() {
        for (Item item : items) {
            ItemUpdater updater = getUpdaterFor(item);
            updater.update(item);
        }
    }

    private ItemUpdater getUpdaterFor(Item item) {
        return new DefaultItemUpdater();
    }
}
