package com.tdd.api.rulesets.data.rules.sku;

public class BuyXGetYFree extends StackableSkuRule {
    private int buy;
    private int get;

    public BuyXGetYFree() {}

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
}
