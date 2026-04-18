package com.tdd.utils;

import com.tdd.tracing.RuleTrace;
import com.tdd.tracing.debug.PricingTrace;

public record TraceResult(RuleTrace ruleTrace, PricingTrace pricingTrace) {}