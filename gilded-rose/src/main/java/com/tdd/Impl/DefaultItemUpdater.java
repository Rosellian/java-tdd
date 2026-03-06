package com.tdd.Impl;

import com.tdd.Item;

public class DefaultItemUpdater extends AbstractItemUpdater {
    public static final DefaultItemUpdater INSTANCE = new DefaultItemUpdater();

    private DefaultItemUpdater() {}


    @Override
    protected void updateQualityBeforeSellDate(Item item) {
        decrease(item, 1);
    }

    @Override
    protected void updateQualityAfterSellDate(Item item) {
        decrease(item, 1);
    }
}
