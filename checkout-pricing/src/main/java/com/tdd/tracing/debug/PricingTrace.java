package com.tdd.tracing.debug;

import java.util.ArrayList;
import java.util.List;

public class PricingTrace {
    private CartSnapshot cart;
    private List<RuleTrace> rules = new ArrayList<>();
    private List<StepTrace> steps = new ArrayList<>();
    private List<DPTrace> dp = new ArrayList<>();
    private List<Double> priceEvolution = new ArrayList<>();
    private double finalPrice;
    private Metadata metadata;
    //TODO Inspection result (tracing.RuleTrace)

    public CartSnapshot getCart() {
        return cart;
    }
    public void setCart(CartSnapshot cart) {
        this.cart = cart;
    }

    public List<RuleTrace> getRules() {
        return rules;
    }
    public void setRules(List<RuleTrace> rules) {
        this.rules = rules;
    }

    public List<StepTrace> getSteps() {
        return steps;
    }
    public void setSteps(List<StepTrace> steps) {
        this.steps = steps;
    }

    public List<DPTrace> getDp() {
        return dp;
    }
    public void setDp(List<DPTrace> dp) {
        this.dp = dp;
    }

    public List<Double> getPriceEvolution() {
        return priceEvolution;
    }
    public void setPriceEvolution(List<Double> priceEvolution) {
        this.priceEvolution = priceEvolution;
    }

    public double getFinalPrice() {
        return finalPrice;
    }
    public void setFinalPrice(double finalPrice) {
        this.finalPrice = finalPrice;
    }

    public Metadata getMetadata() {
        return metadata;
    }
    public void setMetadata(Metadata metadata) {
        this.metadata = metadata;
    }
}