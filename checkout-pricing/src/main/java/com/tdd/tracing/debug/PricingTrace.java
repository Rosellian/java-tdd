package com.tdd.tracing.debug;

import java.util.List;

public class PricingTrace {
    private CartSnapshot cart;
    private List<RuleTrace> rules;
    private List<StepTrace> steps;
    private List<DPTrace> dp;
    private List<Double> priceEvolution;
    private double finalPrice;
    private Metadata metadata;

    public CartSnapshot cart() {
        return cart;
    }

    public List<RuleTrace> rules() {
        return rules;
    }

    public List<StepTrace> steps() {
        return steps;
    }

    public List<DPTrace> dp() {
        return dp;
    }

    public List<Double> priceEvolution() {
        return priceEvolution;
    }

    public double finalPrice() {
        return finalPrice;
    }

    public Metadata metadata() {
        return metadata;
    }
}