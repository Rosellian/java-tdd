package com.tdd.api.rulesets.data.rules.cross;

public class CrossSkuBuyXGetYFree extends CrossSkuRule {
    private String freeSku;
    private int freeQty;

    public CrossSkuBuyXGetYFree() {}

    public String getFreeSku() {
        return freeSku;
    }
    public void setFreeSku(String freeSku) {
        this.freeSku = freeSku;
    }

    public int getFreeQty() {
        return freeQty;
    }
    public void setFreeQty(int freeQty) {
        this.freeQty = freeQty;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("CrossSkuBuyXGetYFree{");
        appendBaseFields(sb);
        sb.append(", freeSku=").append(freeSku);
        sb.append(", freeQty=").append(freeQty);
        sb.append('}');
        return sb.toString();
    }
}
