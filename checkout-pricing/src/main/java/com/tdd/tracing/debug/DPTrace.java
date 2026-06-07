package com.tdd.tracing.debug;

import java.util.List;

public class DPTrace {
    private String state;
    private int stepIndex;
    private List<String> options;
    private String chosen;
    private double price;
    private String sku;

    public String getState() {
        return state;
    }
    public void setState(String state) {
        this.state = state;
    }

    public int getStepIndex() {
        return stepIndex;
    }
    public void setStepIndex(int stepIndex) {
        this.stepIndex = stepIndex;
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

    public String getSku() {
        return sku;
    }
    public void setSku(String sku) {
        this.sku = sku;
    }
}