package com.tdd.api.rulesets.data.rules.cross;

import com.tdd.api.rulesets.data.rules.Rule;
import com.tdd.api.rulesets.data.rules.Stackable;

public class CrossSkuRule extends Rule implements Stackable {
    private boolean stackable;
    private String buySku;
    private int buyQty;

    @Override
    public boolean isStackable() {
        return stackable;
    }
    @Override
    public void setStackable(boolean stackable) {
        this.stackable = stackable;
    }

    public String getBuySku() {
        return buySku;
    }
    public void setBuySku(String buySku) {
        this.buySku = buySku;
    }

    public int getBuyQty() {
        return buyQty;
    }
    public void setBuyQty(int buyQty) {
        this.buyQty = buyQty;
    }
}
