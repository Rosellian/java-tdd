package com.tdd.api.rulesets.data.rules.sku;

public class BuyXGetYDiscount extends StackableSkuRule {
    private int buy;
    private int get;
    private double discount;

    public BuyXGetYDiscount() {}

    public int getBuy() {
        return buy;
    }
    public void setBuy(int buy) {
        this.buy = buy;
    }

    public int getGet() {
        return get;
    }
    public void setGet(int get) {
        this.get = get;
    }

    public double getDiscount() {
        return discount;
    }
    public void setDiscount(double discount) {
        this.discount = discount;
    }
}
