package com.tdd.Impl;

import com.tdd.Item;

public class SulfurasUpdater implements ItemUpdater {
    public static final SulfurasUpdater INSTANCE = new SulfurasUpdater();

    private SulfurasUpdater() {}

    @Override
    public void update(Item item) {}
}
