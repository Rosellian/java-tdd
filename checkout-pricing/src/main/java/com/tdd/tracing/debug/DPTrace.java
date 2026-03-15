package com.tdd.tracing.debug;

import java.util.List;

public class DPTrace {
    private String state;
    private List<String> options;
    private String chosen;
    private double price;

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public String getChosen() {
        return chosen;
    }

    public void setChosen(String chosen) {
        this.chosen = chosen;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}