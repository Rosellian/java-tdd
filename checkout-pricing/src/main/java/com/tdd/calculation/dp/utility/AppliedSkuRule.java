package com.tdd.calculation.dp.utility;

import com.tdd.rules.PricingOption;
import com.tdd.tracing.debug.RuleTrace;

import java.util.Objects;

record AppliedSkuRule(PricingOption rule, RuleTrace trace, double unitPrice) {
        @Override
        public boolean equals(Object o) {
            if (o == null || getClass() != o.getClass()) return false;
            AppliedSkuRule that = (AppliedSkuRule) o;
            return Objects.equals(rule, that.rule);
        }

        @Override
        public int hashCode() {
            return Objects.hashCode(rule);
        }
    }