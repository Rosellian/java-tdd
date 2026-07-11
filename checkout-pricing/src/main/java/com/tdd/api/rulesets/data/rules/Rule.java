package com.tdd.api.rulesets.data.rules;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.tdd.api.rulesets.data.rules.cross.CrossSkuBuyXGetYDiscount;
import com.tdd.api.rulesets.data.rules.cross.CrossSkuBuyXGetYFree;
import com.tdd.api.rulesets.data.rules.sku.BuyXGetYDiscount;
import com.tdd.api.rulesets.data.rules.sku.BuyXGetYFree;
import com.tdd.api.rulesets.data.rules.sku.SkuDiscount;
import com.tdd.api.rulesets.data.rules.sku.SpecialPrice;

import java.util.UUID;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = SpecialPrice.class, name = "SpecialPrice"),
        @JsonSubTypes.Type(value = BuyXGetYFree.class, name = "BuyXGetYFree"),
        @JsonSubTypes.Type(value = BuyXGetYDiscount.class, name = "BuyXGetYDiscount"),
        @JsonSubTypes.Type(value = CrossSkuBuyXGetYFree.class, name = "CrossSkuBuyXGetYFree"),
        @JsonSubTypes.Type(value = CrossSkuBuyXGetYDiscount.class, name = "CrossSkuBuyXGetYDiscount"),
        @JsonSubTypes.Type(value = SkuDiscount.class, name = "SkuDiscount"),
})
public abstract class Rule {
    private UUID id;
    private String name;
    private int priority;

    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public int getPriority() {
        return priority;
    }
    public void setPriority(int priority) {
        this.priority = priority;
    }

    protected void appendBaseFields(StringBuilder sb) {
        sb.append("id='").append(id).append('\'');
        sb.append("name='").append(name).append('\'');
        sb.append(", priority=").append(priority);
    }
}
