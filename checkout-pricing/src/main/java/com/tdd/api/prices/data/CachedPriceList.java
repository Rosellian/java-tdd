package com.tdd.api.prices.data;

public record CachedPriceList(
        PriceListEntry entry,
        PriceList priceList
) {

    public static CachedPriceList from(PriceList priceList) {
        PriceListEntry entry = new PriceListEntry(priceList.id(), priceList.name(), priceList.version());

        return new CachedPriceList(entry, priceList);
    }
}
