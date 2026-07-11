package com.tdd.api.rulesets.data.rules.sku;

import com.tdd.api.rulesets.data.rules.Stackable;

public class StackableSkuRule extends SkuRule implements Stackable {
    private boolean stackable;

    @Override
    public boolean isStackable() {
        return stackable;
    }
    @Override
    public void setStackable(boolean stackable) {
        this.stackable = stackable;
    }

    @Override
    protected void appendBaseFields(StringBuilder sb) {
        super.appendBaseFields(sb);
        sb.append(", stackable=").append(stackable);
    }
}
