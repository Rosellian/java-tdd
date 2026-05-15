package com.tdd.api.rest.trace;

public class CustomerRequest {
    private String id;
    private String segment;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSegment() {
        return segment;
    }

    public void setSegment(String segment) {
        this.segment = segment;
    }
}