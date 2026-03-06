package com.tdd.Impl;

import com.tdd.GildedRose;
import com.tdd.GildedRoseTest;
import com.tdd.Item;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class GildedRoseNewTest extends GildedRoseTest {

    @Override
    protected GildedRose createGildedRose(Item[] items) {
        return new GildedRoseNew(items);
    }
}
