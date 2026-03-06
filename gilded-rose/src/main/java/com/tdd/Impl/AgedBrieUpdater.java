package com.tdd.Impl;

import com.tdd.Item;

public class AgedBrieUpdater extends AbstractItemUpdater {
    public static final ItemUpdater INSTANCE = new AgedBrieUpdater();

    private AgedBrieUpdater() {}

    @Override
    protected void updateQualityBeforeSellDate(Item item) {
        increase(item, 1);
    }

    @Override
    protected void updateQualityAfterSellDate(Item item) {
        increase(item, 1);
    }
}
