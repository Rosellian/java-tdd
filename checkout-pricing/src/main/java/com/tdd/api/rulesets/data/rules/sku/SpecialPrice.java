package com.tdd.api.rulesets.data.rules.sku;

public class SpecialPrice extends StackableSkuRule {
    private double price;
    private int quantity;

    public SpecialPrice() {}

    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("SpecialPrice{");
        appendBaseFields(sb);
        sb.append(", quantity=").append(quantity);
        sb.append(", price=").append(price);
        sb.append('}');
        return sb.toString();
    }
}
