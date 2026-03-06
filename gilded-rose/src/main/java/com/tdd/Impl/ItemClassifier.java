package com.tdd.Impl;

import com.tdd.Item;

public class ItemClassifier {

    public static ItemType classify(Item item) {
        String name = item.name;

        switch (name) {
        case "Aged Brie" -> {
            return ItemType.AGED_BRIE;
        }
        case "Sulfuras, Hand of Ragnaros" -> {
            return ItemType.SULFURAS;
        }
        case "Backstage passes to a TAFKAL80ETC concert" -> {
            return ItemType.BACKSTAGE_PASS;
        }
        }
        if (name.startsWith("Conjured")) {
            return ItemType.CONJURED;
        }
        return ItemType.NORMAL;
    }
}