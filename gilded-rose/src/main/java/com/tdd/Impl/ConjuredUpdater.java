package com.tdd.Impl;

import com.tdd.Item;

public class ConjuredUpdater extends AbstractItemUpdater{
    public static final ConjuredUpdater INSTANCE = new ConjuredUpdater();

    private ConjuredUpdater() {}

    @Override
    protected void updateQualityBeforeSellDate(Item item) {
        decrease(item, 2);
    }

    @Override
    protected void updateQualityAfterSellDate(Item item) {
        decrease(item, 2);
    }
}
