package com.tdd.api.rest.evaluate;

import java.util.Map;

public class EvaluateRequest {
    public Map<String, Integer> cart;
    public String ruleset;

    @Override
    public String toString() {
        return "EvaluateRequest{" +
                "cart=" + cart +
                ", ruleset='" + ruleset + '\'' +
                '}';
    }
}