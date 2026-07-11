package com.tdd.api.rulesets.data.rules.sku;

public class SkuDiscount extends SkuRule {
    private double discount;

    public SkuDiscount() {}

    public double getDiscount() {
        return discount;
    }
    public void setDiscount(double discount) {
        this.discount = discount;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("SkuDiscount{");
        appendBaseFields(sb);
        sb.append(", discount=").append(discount);
        sb.append('}');
        return sb.toString();
    }
}
