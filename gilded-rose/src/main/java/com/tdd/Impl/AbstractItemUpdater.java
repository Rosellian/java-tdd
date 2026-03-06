package com.tdd.Impl;

import com.tdd.Item;

public abstract class AbstractItemUpdater implements ItemUpdater {

    @Override
    public final void update(Item item) {
        updateQualityBeforeSellDate(item);

        item.sellIn -= 1;

        if (item.sellIn < 0) {
            updateQualityAfterSellDate(item);
        }

        clampQuality(item);
    }

    protected abstract void updateQualityBeforeSellDate(Item item);

    protected abstract void updateQualityAfterSellDate(Item item);

    protected void increase(Item item, int amount) {
        item.quality = Math.min(50, item.quality + amount);
    }

    protected void decrease(Item item, int amount) {
        item.quality = Math.max(0, item.quality - amount);
    }

    private void clampQuality(Item item) {
        item.quality = Math.max(0, Math.min(50, item.quality));
    }
}