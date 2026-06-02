package com.tdd.api.rulesets.data.rules.sku;

import com.tdd.api.rulesets.data.rules.Rule;

public abstract class SkuRule extends Rule {
    private String sku;

    public String getSku() {
        return sku;
    }
    public void setSku(String sku) {
        this.sku = sku;
    }

    @Override
    protected void appendBaseFields(StringBuilder sb) {
        super.appendBaseFields(sb);
        sb.append(", sku='").append(sku).append('\'');
    }
}
