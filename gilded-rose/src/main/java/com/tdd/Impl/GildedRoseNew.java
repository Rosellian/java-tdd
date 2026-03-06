package com.tdd.Impl;

import com.tdd.GildedRose;
import com.tdd.Item;
import java.util.Map;

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
        ItemType type = ItemClassifier.classify(item);
        return switch (type) {
            case BACKSTAGE_PASS -> BackstagePassUpdater.INSTANCE;
            case SULFURAS -> SulfurasUpdater.INSTANCE;
            case AGED_BRIE -> AgedBrieUpdater.INSTANCE;
            case CONJURED -> ConjuredUpdater.INSTANCE;
            case NORMAL -> DefaultItemUpdater.INSTANCE;
        };
    }
}
