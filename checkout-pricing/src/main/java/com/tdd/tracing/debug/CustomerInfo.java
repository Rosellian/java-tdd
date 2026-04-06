package com.tdd.tracing.debug;

public class CustomerInfo {
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

    public static CustomerInfo from(String id, String segment) {
        CustomerInfo customerInfo = new CustomerInfo();
        customerInfo.id = id;
        customerInfo.segment = segment;

        return customerInfo;
    }
}