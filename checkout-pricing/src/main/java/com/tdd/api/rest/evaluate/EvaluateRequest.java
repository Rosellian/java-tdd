package com.tdd.api.rest.evaluate;

import java.util.Map;

public class EvaluateRequest {
    public Map<String, Integer> cart;
    public String ruleSet;

    @Override
    public String toString() {
        return "EvaluateRequest{" +
                "cart=" + cart +
                ", ruleSet='" + ruleSet + '\'' +
                '}';
    }
}