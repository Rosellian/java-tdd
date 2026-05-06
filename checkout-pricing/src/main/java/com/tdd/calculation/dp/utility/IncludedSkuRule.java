package com.tdd.calculation.dp.utility;

import com.tdd.rules.PricingOption;
import com.tdd.tracing.debug.RuleTrace;

record IncludedSkuRule(PricingOption rule, RuleTrace trace) {
    @Override
    public boolean equals(Object o) {
        if (!(o instanceof IncludedSkuRule other)) return false;
        return rule.id().equals(other.rule.id());
    }

    @Override
    public int hashCode() {
        return rule.id().hashCode();
    }
}