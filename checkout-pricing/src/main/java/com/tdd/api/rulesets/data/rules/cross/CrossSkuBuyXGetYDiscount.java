package com.tdd.api.rulesets.data.rules.cross;

public class CrossSkuBuyXGetYDiscount extends CrossSkuRule {
    private String discountSku;
    private int discountQty;
    private double discount;

    public CrossSkuBuyXGetYDiscount() {}

    public String getDiscountSku() {
        return discountSku;
    }
    public void setDiscountSku(String discountSku) {
        this.discountSku = discountSku;
    }

    public int getDiscountQty() {
        return discountQty;
    }
    public void setDiscountQty(int discountQty) {
        this.discountQty = discountQty;
    }

    public double getDiscount() {
        return discount;
    }
    public void setDiscount(double discount) {
        this.discount = discount;
    }
}
