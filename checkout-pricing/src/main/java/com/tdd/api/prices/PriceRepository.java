package com.tdd.api.prices;

import com.tdd.api.data.DataRepository;
import com.tdd.api.prices.data.PriceList;

import java.util.List;

public class PriceRepository implements DataRepository<PriceList> {

    @Override
    public PriceList load(String name) {
        return null;
    }

    @Override
    public void save(String name, PriceList data) {

    }

    @Override
    public List<String> list() {
        return List.of();
    }
}
