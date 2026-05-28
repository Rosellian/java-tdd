package com.tdd.api.rulesets.data.rules.sku;

public class SkuDiscount extends SkuRule {
    private double discount;

    public double getDiscount() {
        return discount;
    }
    public void setDiscount(double discount) {
        this.discount = discount;
    }
}
