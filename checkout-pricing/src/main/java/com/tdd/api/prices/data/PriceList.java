package com.tdd.api.prices.data;

import java.util.List;

public class PriceList {
    private String name;
    private List<Price> unitPrices;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public List<Price> getUnitPrices() {
        return unitPrices;
    }
    public void setUnitPrices(List<Price> unitPrices) {this.unitPrices = unitPrices;}
}
