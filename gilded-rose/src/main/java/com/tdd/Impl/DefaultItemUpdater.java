package com.tdd.Impl;

import com.tdd.Item;

public class DefaultItemUpdater implements ItemUpdater {

    @Override
    public void update(Item item) {
        int sellIn = item.sellIn;
        int quality = item.quality;

        item.sellIn--;

        if (quality > 0) {
            item.quality = quality - (sellIn < 0 ? 2 : 1);
        }
    }
}
