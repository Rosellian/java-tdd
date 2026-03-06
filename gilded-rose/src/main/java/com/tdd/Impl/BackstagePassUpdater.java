package com.tdd.Impl;

import com.tdd.Item;

public class BackstagePassUpdater extends AbstractItemUpdater {
    public static final BackstagePassUpdater INSTANCE = new BackstagePassUpdater();

    private BackstagePassUpdater() {}

    @Override
    protected void updateQualityBeforeSellDate(Item item) {
        increase(item, 1);
        if (item.sellIn <= 10) {
            increase(item, 1);
        }
        if (item.sellIn <= 5) {
            increase(item, 1);
        }
    }

    @Override
    protected void updateQualityAfterSellDate(Item item) {
        item.quality = 0;
    }
}
