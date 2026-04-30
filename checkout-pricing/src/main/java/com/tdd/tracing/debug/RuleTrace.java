package com.tdd.tracing.debug;

import java.util.Map;

public class RuleTrace {
    private String id;
    private String name;
    private String sku;
    private int stepIndex;
    private boolean matched;
    private String reason;
    private double before;
    private double after;
    private double delta;
    private Map<String, Object> inputs;
    private Map<String, Object> outputs;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public int getStepIndex() {
        return stepIndex;
    }

    public void setStepIndex(int stepIndex) {
        this.stepIndex = stepIndex;
    }

    public boolean isMatched() {
        return matched;
    }

    public void setMatched(boolean matched) {
        this.matched = matched;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public double getAfter() {
        return after;
    }

    public void setAfter(double after) {
        this.after = after;
    }

    public double getBefore() {
        return before;
    }

    public void setBefore(double before) {
        this.before = before;
    }

    public double getDelta() {
        return delta;
    }

    public void setDelta(double delta) {
        this.delta = delta;
    }

    public Map<String, Object> getInputs() {
        return inputs;
    }

    public void setInputs(Map<String, Object> inputs) {
        this.inputs = inputs;
    }

    public Map<String, Object> getOutputs() {
        return outputs;
    }

    public void setOutputs(Map<String, Object> outputs) {
        this.outputs = outputs;
    }
}